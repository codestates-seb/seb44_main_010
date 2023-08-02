# 머니메이드(MoneyMade)

## 프로젝트 
### 개요
- 사용자가 자신의 자산과 입출금을 관리할 수 있는 서비스 ‘💰MoneyMade‘
- 내가 가지고있는 자산(개인계좌, 투자계좌)을 한눈에 보는 서비스 구축
- 내가 사용한 소비내역 입력을 통한 지출계획을 한눈에 보는 서비스 구축

### 배경

## 개발인원(Member)
|이름|역할|담당|이름|역할|담당|
|--|--|--|--|--|--|
|이은호|BE 팀장| AWS, 배포 자동화, 회의록 등 |정지은|FE 팀장| 소비 페이지 |
|장태환|BE 팀원| 기능 구현 |채명수|FE 팀원| 메인 페이지, 로그인, 회원가입 페이지, 클라이언트 배포 |
|백지희|BE 팀원| 챗봇 담당 |정태현|FE 팀원| 자산 페이지|

## 프로젝트 기술 스택
### Environments
<img src="https://img.shields.io/badge/intellij-000000?style=for-the-badge&logo=intellijidea&logoColor=white"><img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### Development Stack
#### BackEnd

<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"><img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"><img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"><img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"><img src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
<img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"><img src="https://img.shields.io/badge/githubactions-181717?style=for-the-badge&logo=githubactions&logoColor=white">

#### FrontEnd
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"><img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"><img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"><img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"><img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"><img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">  

### Communicatoin
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"><img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">

## 프로젝트 진행 과정
- 피그마를 이용해 목업 디자인 스케치와 메인 디자인 
- 페이지 별 역할 분담
- 기능 구현
- 배포 테스트 및 기능 수정
- 배포
## 프로젝트 구현 내용
### FE
#### 정지은

#### 정태현

#### 채명수
#### 1. 회원가입 페이지
<p align="center">
<img width="70%" alt="스크린샷 2023-08-02 오후 3 50 17" src="https://github.com/codestates-seb/seb44_main_010/assets/124559717/184288b6-fbdb-44d0-a8c5-e7f79494616c"> 
</p>

- 회원가입시 사용되는 메일을 통해 [**이메일 인증하기**](https://velog.io/@coaudtn0276/Project-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EB%A9%94%EC%9D%BC-%EC%9D%B8%EC%A6%9D-%EA%B8%B0%EB%8A%A5%EA%B5%AC%ED%98%84) 버튼을 누르면 메일을 통해 인증번호 전송.

<p align="center">
<img width="70%" alt="스크린샷 2023-08-02 오후 3 50 17" src="https://github.com/codestates-seb/seb44_main_010/assets/124559717/f85b3fbf-790a-4885-87d5-adf7d7974579"> 
</p>

- 알맞은 메일주소와 메일을 통해 받은 인증번호를 알맞게 넣으면 가입 완료버튼 활성화

#### 2. 로그인 페이지
<p align="center">
<img width="70%" alt="스크린샷 2023-08-02 오후 3 50 17" src="https://github.com/codestates-seb/seb44_main_010/assets/124559717/4a4e5fad-d21c-462a-b0fc-50f8aca76946"> 
</p>

- 회원가입이된 아이디와 비밀번호, [**reCAPTCHA 인증**](https://velog.io/@coaudtn0276/ProjectReact%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-google-reCAPTCHA) 까지 확인이 되면 로그인버튼이 나오면서 로그인이 가능하게 구현

<p align="center">
<img width="70%" alt="스크린샷 2023-08-02 오후 3 50 17" src="https://github.com/codestates-seb/seb44_main_010/assets/124559717/6bc9f123-0af3-4b32-9a08-0bfae0a116c1"> 
</p>

- 로그인 완료 후 Local Storage를 통해 발급받은 [**토큰**](https://velog.io/@coaudtn0276/Project-%ED%86%A0%ED%81%B0%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84), 이름, userId를 저장하고 React-toolkit을 이용해 로그인 상태의 유무 확인

#### 3. 서버로부터 받은 Profile데이터 Redux-toolkit으로 저장 후 사용
<p align="center">
<img width="30%" alt="스크린샷 2023-08-02 오후 3 50 17" src="https://github.com/codestates-seb/seb44_main_010/assets/124559717/26468ad1-cd32-4083-a83f-8ad44dbb10ea"> 
</p>

- Profile 컴포넌트의 경우 서비스하는 페이지마다 들어가야하는 데이터였기 때문에 [**Redux-toolkit**](https://velog.io/@coaudtn0276/Project-Redux%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-api%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%80%EC%9E%A5) 으로 저장 후 사용

#### 4. 챗봇 UI
<p align="center">
<img width="30%" alt="스크린샷 2023-08-02 오후 3 50 17" src="https://github.com/codestates-seb/seb44_main_010/assets/124559717/fde30c45-2efc-4f84-9895-54a19b7e973c"> 
</p>

- Dialogflow로 만들어진 서버와 통신 후, 질문에 대한 답변 데이터를 챗봇에 구현

  
### BE
#### 이은호

#### 백지희

#### 장태환
## 프로젝트 한계 및 개선 방안
### FE
#### 한계
- 프로젝트 초기 단계에서 웹과 앱을 동시에 구현하기 위해 PWA 셋팅을 하였지만 후반으로 갈 수록 PWA에 관해서는 다뤄보지 못함.
프로젝트를 반응형으로 만들면 간단하게 해결될 문제일 줄 알았는데 반응형을 좀 더 정교하게 만들었어야 했다는 생각이 듦.
- 메인페이지 섹션별 스크롤 이벤트를 구현 하였는데 마우스 휠로는 구현이 잘 됬지만 트랙패드의 경우 버벅거리는 에러를 발견.

#### 개선 방안
- 모바일까지 생각한 반응형 웹의 경우 최소 크기에서부터 컴포넌트들을 배치 하면서 점점 페이지 크기를 키워가면서 구현.
  
### BE

