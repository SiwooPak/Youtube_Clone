## 해야 할일
### 6/8 front단 video upload 페이지 템플릿 및 drop-zone 모듈 설치 및 활용.
- 모듈 설치: npm install react-dropzone --save

### 6/11 
- PrivateOptions, CategoryOptions 배열로 생성
- title, description, private, category 엘리먼트의 state 추가 및 이벤트핸들러 추가
- select태그의 option들은 map()로 처리

- Multer로 서버에 비디오 저장하기
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

### 6/14
- Video Detail Page 만들기
  - 비어있는 비디오 디테일 페이지 생성(/client/src/components/views/VideoDetailPage/VideoDetailPage.js)
  - 비디오 디테일 페이지를 위한 Route 만들기(/client/src/components/App.js)
  - 비디오 디테일 페이지 템플릿 만들기
  - mongoDB에서 비디오 데이터 가져오기
  - 가져온 데이터들을 스크린에 출력

### 6/15~16
- ffmpeg 홈브류로 이용한 설치 실패
  - 직접 깃헙에서 클론한다음 빌드 설치로 해결..(06.15 05:59)
  - 썸네일 파일은 정상적으로 폴더에 저장되었으나 에러 알림이 뜸
  - 살펴보니 오타가 있었음. 오타 수정!
- Video Detail Page의  sidebar 구현
  - side video 레이아웃 템플릿 만들기
  - 1개의 카드 템플릿 만들기
  - DB에서 모든 비디오 데이터를 불러오기
  - 불러온 데이터 화면에 출력하기

### 6/16~17
- 구독기능(1)
  - Subscriber Model 만들기 (column: userTo, userFrom)
  - Subscribe Button UI
  - DB에서 얼마나 많은 사람이 비디오 업로드 한 유저를 구독하는지 정보 가져오기
  - 내가 이 비디오 업로드한 유저를 구독하는지 정보 가져오기
  - 가져온 정보를 화면에 출력

### 6/18
- 구독기능(2)
  - 구독하기 기능 만들기
  - 구독 취소하기 기능 만들기
    - 아직 구독중이 아니라면 'SUBSCRIBE'
    - 이미 구독중이라면 'UNSUBSCRIBE'

### 6/19
- 구독페이지(구독한 영상만 보여주는 컴포넌트)
  - 빈 페이지 생성(Subs.js)
  - Subs페이지를 위한 Route 생성
  - 템플릿 생성
  - 내가 구독한 유저의 비디오들만 서버에서 가져오기
  - 가져온 비디오 데이터들 화면에 출력