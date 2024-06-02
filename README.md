## 레시피 검색 저장 웹

<!-- Table of Contents -->

## :notebook_with_decorative_cover: 목차

- [About the Project](#star2-about-the-project)
  - [AllFood Screenshots](#camera-개인-블로그-screenshots)
  - [Tech Stack](#space_invader-tech-stack)
  - [웹사이트 특징](#dart-블로그-특징)
  - [주요 색상](#art-주요-색상)
  - [Environment Variables](#key-environment-variables)
- [개발 Roadmap](#compass-개발-roadmap)
- [Getting Started](#toolbox-getting-started)
  - [Running Dev](#test_tube-running-tests)
  - [Deployment](#triangular_flag_on_post-deployment)
- [License](#warning-license)
- [Contact](#handshake-contact)

<!-- About the Project -->

## :star2: About the Project

<h3>AllFood</h3>
<p>해당 프로젝트는 Edamam api / firebase / OpenWeather api / Youtube api를 활용해서 만든 Next.js 웹사이트입니다.</p>
<p>테스트 아이디 : user@test.com | 테스트 비번 : test1234!@</p>

<!-- Screenshots -->

### :camera: AllFood Screenshots

<div align="center"> 
  <img width="1280" alt="blogcapture" src="https://github.com/pminsun/AllFood/assets/125803499/4e039086-ead4-4a39-88ae-1cbe343cd4cb" alt="screenshot">
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

<p>기술스택</p>

- Javascript
- Next.js
- React.js

<p>사용한 메인 라이브러리</p>

- react-apexcharts v1.4
- react-query v5.35
- zustand v4.5

<!-- Features -->

### :dart: 블로그 특징

- Edamam api로 식재료, 음식에 대한 레시피정보, 영양소 정보 검색 데이터를 Next.js로 제작 후 EC2로 배포한 웹사이트입니다.
- firebase를 활용해 로그인, 회원가입이 가능하며 계정 별 개인 레시피 정보를 생성, 수정 삭제 할 수 있습니다.
- OpenWeather api를 활용해 오늘 날씨에 어울리는 음식을 추천합니다.
- Youtube api를 활용해 음식 관련 유명 유투버의 구독자, 영상 수와 최신 영상을 보여줍니다.

<!-- Color Reference -->

### :art: 주요 색상

| LightColor    | Hex                                                              |
| ------------- | ---------------------------------------------------------------- |
| Primary Color | ![#f6f9f7](https://via.placeholder.com/10/f6f9f7?text=+) #f6f9f7 |
| Accent Color  | ![#c6cdc6](https://via.placeholder.com/10/c6cdc6?text=+) #c6cdc6 |
| Text Color    | ![#000000](https://via.placeholder.com/10/000000?text=+) #000000 |

<!-- Env Variables -->

### :key: Environment Variables

<p>사용된 환경 설정</p>

`NEXT_PUBLIC_APP_ID`
`NEXT_PUBLIC_APP_KEY`
`NEXT_PUBLIC_NUTRITION_APP_ID`
`NEXT_PUBLIC_NUTRITION_APP_KEY`
`NEXT_PUBLIC_YOUTUBE_APP_KEY`
`NEXTAUTH_SECRET`
`NEXT_PUBLIC_OPENWEATHER_APP_ID`

`NEXT_PUBLIC_FIREBASE_API_KEY`
`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
`NEXT_PUBLIC_PROJECT_ID`
`NEXT_PUBLIC_STORAGE_BUCKET`
`NEXT_PUBLIC_MESSAGING_SENDER_ID`
`NEXT_PUBLIC_APP_ID`
`NEXT_PUBLIC_MEASURMENT_ID`

<!-- Roadmap -->

## :compass: 개발 Roadmap

- [x] 홈페이지 - Edamam api 활용한 검색창 (query로 검색어 전달)
- [x] 홈페이지 -OpenWeather api 활용해 오늘 날씨에 어울리는 추천음식, 멘트
- [x] 홈페이지 - Youtube api를 활용해 유명 유투버의 구독자, 영상 수와 최신 영상
- [x] 홈페이지 - 하단 lottieAny 적용
- [x] NUTRITION 페이지 - Edamam api 활용한 영양성분 검색시 그래프 도출
- [x] RECIPES 페이지 - Edamam api 활용한 검색시 총 건수, 리스트
- [x] 로그인 / 회원가입 페이지 - firebase auth 연동
- [x] 모달 - 로그아웃
- [x] 마이페이지 - My Account / My Recipes 탭 구현
- [x] 마이페이지 - 계정 탈퇴 / 계정 비밀번호 수정
- [x] 마이페이지 - My Recipes 추가

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Running Tests -->

### :test_tube: Running Dev

```bash
  npm run dev
```

<!-- Deployment -->

### :triangular_flag_on_post: Deployment

To deploy this project run

```bash
  npm run build
  npm start
```

<!-- License -->

## :warning: License

MIT 라이센스에 따라 배포됩니다. 자세한 내용은 LICENSE 을 확인하세요

<!-- Contact -->

## :handshake: Contact

박민선(Minsun Park) - pminsun309@gmail.com

Project Link: [https://www.myallfood.com/](https://www.myallfood.com/)
