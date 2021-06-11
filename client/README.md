### 6/8 /client/component/views/VideoUploadPage/VideoUploadPage 
- 템플릿 및 dropzone 모듈 설치 및 구현

### 6/11 
- PrivateOptions, CategoryOptions 배열로 생성
- title, description, private, category 엘리먼트의 state 추가 및 이벤트핸들러 추가
- select태그의 option들은 map()로 처리

- Mulit로 서버에 비디오 저장하기
  - OnDrop function 만들기
  - 서버에 Multer모듈 추가 npm install multer --save 
  - 업로드한 비디오 파일 서버로 보내기
  - 받은 비디오 파일을 서버에서 저장
  - 파일 저장 경로를 클라이언트로 전달

