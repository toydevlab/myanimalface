# What's My Animal Face? (나는 무슨 상?)

![Made with Gemini CLI](https://img.shields.io/badge/Made%20with-Gemini%20CLI-blue.svg)

> 사진 한 장으로 내 얼굴과 닮은 동물상을 찾아주는 AI 기반 웹 애플리케이션입니다. Google의 Teachable Machine으로 학습된 이미지 분류 모델을 사용하여, 사용자가 업로드한 사진을 분석하고 가장 닮은 동물상과 일치율을 재미있는 코멘트와 함께 보여줍니다.

**[➡️ Live Demo 바로가기](https://your-github-username.github.io/your-repo-name/)**  
*(추후 GitHub Pages 배포 후 이 링크를 실제 주소로 수정하세요.)*

---

## ✨ 주요 기능

- **📸 이미지 업로드**: 분석하고 싶은 사진을 간편하게 업로드합니다.
- **🧠 AI 얼굴상 분석**: Teachable Machine으로 학습된 모델이 얼굴을 분석하여 7가지 동물상(`강아지`, `고양이`, `토끼`, `여우`, `공룡`, `사슴`, `거북이`)과의 일치율을 계산합니다.
- **📊 시각적인 결과**: 각 동물상과의 일치율을 프로그레스 바로 한눈에 보여줍니다.
- **💬 재치있는 코멘트**: 가장 닮은 동물상의 특징을 살린 위트 있는 한마디와 해시태그를 제공합니다.
- **🌐 다국어 지원**: 사용자의 브라우저 언어에 따라 한국어와 영어를 자동으로 지원합니다.

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Machine Learning**: [TensorFlow.js](https://www.tensorflow.org/js), [Google Teachable Machine](https://teachablemachine.withgoogle.com/)
- **Fonts**: Google Fonts (Poppins, Noto Sans KR)

## 🚀 로컬에서 실행하기

1.  **프로젝트 클론**
    ```bash
    git clone https://github.com/your-github-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **파일 실행**
    `index.html` 파일을 웹 브라우저에서 직접 열어 실행합니다.

## 🌐 GitHub Pages로 배포하기

1.  이 프로젝트를 당신의 GitHub 계정에 `your-repo-name`이라는 이름으로 새로운 저장소(repository)를 만들어 푸시합니다.
2.  저장소의 **Settings** 탭으로 이동합니다.
3.  왼쪽 메뉴에서 **Pages**를 클릭합니다.
4.  **Branch** 항목에서 `main` (또는 `master`) 브랜치를 선택하고 `/root` 폴더를 지정한 뒤 **Save** 버튼을 누릅니다.
5.  잠시 후 사이트가 배포되며, 상단에 나타나는 주소를 이 `README.md` 파일의 [Live Demo](#) 링크에 적용하세요.

## 🙏 Acknowledgements

- 이 프로젝트의 전체적인 구조와 코드는 **Google Gemini CLI**를 통해 생성 및 수정되었습니다.
- 이미지 분류 모델은 Google의 **Teachable Machine**을 사용하여 학습되었습니다.
