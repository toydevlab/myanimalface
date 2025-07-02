// --- 1. 다국어 텍스트 데이터 및 동물상별 색상 매핑 ---
const animalColors = {
    dog: "#FFD700",    // 골드 (따뜻하고 친근한 느낌)
    cat: "#9370DB",    // 보라색 (신비롭고 도도한 느낌)
    rabbit: "#FFB6C1", // 연분홍 (귀엽고 사랑스러운 느낌)
    fox: "#FF8C00",    // 진한 주황 (날렵하고 영리한 느낌)
    dinosaur: "#20B2AA",// 밝은 청록 (강렬하고 독특한 느낌)
    deer: "#87CEEB",   // 하늘색 (청순하고 맑은 느낌)
    turtle: "#6B8E23", // 올리브 (차분하고 지혜로운 느낌)
    default: "#5cb85c" // 기본값 (이전의 초록색)
};

const i18n = {
    en: {
        title: "What's My Animal Face?",
        subtitle: "Upload a photo to discover<br>your animal face type!",
        uploadLabel: "📸 Choose a Photo",
        resultTitle: "Analysis Result",
        comments: {
            dog: { comment: "You have an adorable, puppy-like charm that disarms everyone around you!", tags: "#puppy_vibes #human_golden_retriever #pure_charm" },
            cat: { comment: "Chic and poised, you draw people in with your mysterious allure.", tags: "#chic_and_mysterious #cat_vibes #effortlessly_cool" },
            rabbit: { comment: "With your wide, innocent eyes, you have a charm that makes people want to protect you.", tags: "#adorable #sweet_vibes #must_protect" },
            fox: { comment: "With your sharp eyes and sophisticated vibe, you possess a smart and fatal charm.", tags: "#sly_and_stylish #urban_fox #brainy_and_beautiful" },
            dinosaur: { comment: "You have a charismatic and striking presence that's impossible to forget.", tags: "#charismatic_presence #unique_features #face_genius" },
            deer: { comment: "Your clear, large eyes give you a pure and elegant vibe.", tags: "#doe_eyed #pure_elegance #forest_fairy" },
            turtle: { comment: "You have a calm and wise aura that makes people feel at ease.", tags: "#calm_and_wise #human_sanctuary #deep_charm" },
            default: { comment: "You have a truly unique and captivating charm!", tags: "#unique_vibes #irreplaceable" }
        }
    },
    ko: {
        title: "나는 무슨 상?",
        subtitle: "사진을 업로드하여 당신의 얼굴과 닮은<br>동물상을 찾아보세요!",
        uploadLabel: "📸 사진 선택하기",
        resultTitle: "분석 결과",
        comments: {
            dog: { comment: "멍뭉미 폭발! 주변 사람들을 무장해제시키는 귀여움의 소유자시네요.", tags: "#멍뭉미뿜뿜 #인간댕댕이 #귀여움한도초과" },
            cat: { comment: "시크함과 도도함이 매력! 알 수 없는 매력으로 사람들을 끌어당기는군요.", tags: "#시크도도_끝판왕 #나만없어_인간고양이 #매력적인츤데레" },
            rabbit: { comment: "동그란 눈망울이 매력 포인트! 보호해주고 싶은 사랑스러움을 가졌어요.", tags: "#귀염뽀짝_토끼상 #과즙상_토끼버전 #지켜주고싶은" },
            fox: { comment: "날렵한 눈매와 세련된 분위기! 지적이면서도 치명적인 매력을 겸비했네요.", tags: "#치명적인_눈빛 #도시의_인간여우 #뇌섹남녀_정석" },
            dinosaur: { comment: "카리스마 넘치는 뚜렷한 이목구비! 한번 보면 잊을 수 없는 독보적인 매력이 있군요.", tags: "#독보적인_카리스마 #선굵은_미남미녀 #얼굴천재" },
            deer: { comment: "맑고 큰 눈망울이 매력적! 청순하고 우아한 분위기를 자아내는군요.", tags: "#사슴같은_눈망울 #청순미의_정석 #숲속의_요정" },
            turtle: { comment: "고요하고 지혜로운 분위기! 당신 곁에 있으면 마음이 편안해져요.", tags: "#고요한_카리스마 #인간안정제 #보면볼수록_매력" },
            default: { comment: "당신은 독보적인 매력을 가졌군요!", tags: "#유니크 #대체불가" }
        }
    }
};

// --- 2. 언어 설정 ---
const userLang = navigator.language || navigator.userLanguage;
const lang = userLang.startsWith('ko') ? 'ko' : 'en';
const T = i18n[lang];

// --- 3. 모델 및 전역 변수 설정 ---
const URL = "https://teachablemachine.withgoogle.com/models/YjwhDwO86/";
let model, labelContainer, maxPredictions, loader;

// --- 4. 초기화 및 UI 텍스트 설정 ---
document.addEventListener('DOMContentLoaded', () => {
    loader = document.getElementById('loader-overlay');
    document.title = T.title;
    document.getElementById('main-title').innerHTML = T.title;
    document.getElementById('subtitle').innerHTML = T.subtitle;
    document.getElementById('upload-label').innerHTML = T.uploadLabel;
    document.getElementById('result-title').innerHTML = T.resultTitle;
    initModel();
});

// --- 5. 모델 로딩 ---
async function initModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    } catch (error) {
        console.error("Error loading model:", error);
        // Handle model loading error (e.g., show an error message)
    } 
    labelContainer = document.getElementById("label-container");
    document.getElementById("image-upload").addEventListener("change", handleImageUpload);
}

// --- 6. 이미지 처리 및 예측 ---
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    loader.style.display = 'flex'; // Show loader
    document.getElementById("result-wrapper").style.display = "flex";
    const image = document.getElementById('uploaded-image');
    const reader = new FileReader();
    reader.onload = function(e) {
        image.src = e.target.result;
        image.onload = () => predict(image);
    };
    reader.readAsDataURL(file);
}

async function predict(imageElement) {
    const prediction = await model.predict(imageElement);
    prediction.sort((a, b) => b.probability - a.probability);

    labelContainer.innerHTML = "";
    prediction.forEach(p => {
        const percentage = (p.probability * 100).toFixed(1);
        const container = document.createElement("div");
        container.className = "result-bar-container";
        const name = document.createElement("div");
        name.className = "class-name";
        name.innerHTML = p.className;
        const barBg = document.createElement("div");
        barBg.className = "progress-bar-bg";
        const bar = document.createElement("div");
        bar.className = "progress-bar";
        bar.innerHTML = `${percentage}%`;
        
        // 동물상에 맞는 색상 적용
        bar.style.backgroundColor = animalColors[p.className] || animalColors.default;

        setTimeout(() => { bar.style.width = `${percentage}%`; }, 100);
        barBg.appendChild(bar);
        container.appendChild(name);
        container.appendChild(barBg);
        labelContainer.appendChild(container);
    });

    const topResult = prediction[0].className;
    const commentData = T.comments[topResult] || T.comments.default;
    
    document.getElementById("comment-text").innerHTML = commentData.comment;
    document.getElementById("hashtags").innerHTML = commentData.tags;
    document.getElementById("hashtags").style.color = animalColors[topResult] || animalColors.default; // 해시태그 색상 변경
    document.getElementById("comment-container").style.display = "block";

    loader.style.display = 'none'; // Hide loader when prediction is complete
}