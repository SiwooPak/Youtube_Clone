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
    - wget으로 받아본다음 주소를 복사해서
    - $ brew edit theora 로 편집기 들어가서
    - url의 내용을 https://ftp.osuosl.org/pub/xiph/releases/theora/libtheora-1.1.1.tar.bz2 이걸로
    - 바꿔서하니 설치 잘 됨인데, 아직도 설치중... 6시간째 설치라닛..
    - dependency rust 쪽의 에러가 나서 brew install rust
  - $ npm install fluent-ffmpeg --save
  - 서버에 저장된 비디오를 이용한 썸네일 생성
  - 생성된 썸네일을 서버에 저장
  - 썸네일 이미지 파일 경로 정보를 클라이언트에 보내기
  - 썸네일 이미지를 화면에 표시

### 6/13
- 비디오 업로드하기
  - server/models/Video.js 작성
    - 비디오 Collection
    - 보낸 데이터들을 MongoDB에 저장
  - client/src/components/views/VideoUploadPage/VideoUploadPage.js
    - onSubmit 함수 작성
    - 요청할 데이터들을 서버에 보냄
    - Landing Page로 이동.

- Landing Page에 업로드된 비디오들 보여주기.
  - 빈 Landing Page 생성
  - 비디오 카드 템플릿 만들기
  - mongoDB에서 모든 비디오 데이터 가져오기
  - 가져온 비디오 데이터들을 스크린에 뿌리기


- Video Detail Page 만들기
 - 비어있는 비디오 디테일 페이지 생성(/client/src/components/views/VideoDetailPage/VideoDetailPage.js)
 - 비디오 디테일 페이지를 위한 Route 만들기(/client/src/components/App.js)
 - 비디오 디테일 페이지 템플릿 만들기
 - mongoDB에서 비디오 데이터 가져오기
 - 가져온 데이터들을 스크린에 출력