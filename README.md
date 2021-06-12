### 6/8 front단 video upload 페이지 템플릿 및 drop-zone 모듈 설치 및 활용.
- 모듈 설치: npm install react-dropzone --save

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

### 6/12
- ffmpeg로 비디오 썸네일 생성하기
  - 썸네일 생성을 위한 모듈 설치: $ brew install ffmpeg
    - 내 맥북이 구모델이라 중간에 theora 가 url이 막혀서
    - $ brew edit ora 로 들어가서
    - url의 내용을 https://ftp.osuosl.org/pub/xiph/releases/theora/libtheora-1.1.1.tar.bz2 이걸로
    - 바꿔서 설치함.
  - $ npm install fluent-ffmpeg
  - 서버에 저장된 비디오를 이용한 썸네일 생성
  - 생성된 썸네일을 서버에 저장
  - 썸네일 이미지 파일 경로 정보를 클라이언트에 보내기
  - 썸네일 이미지를 화면에 표시