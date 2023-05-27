## 초기 설정 방법

### MongoDB 초기 설정
MongoDB에 대해 필요한 권한은 다음과 같습니다. <br>
아래와 같은 권한을 가진 user를 만들어주셔야 합니다.

- 사용 범위 : DB 전체
- "find", "update", "insert", "listCollections"

<br>

### 서울 열린데이터 광장 API Key 가져오기
해당 프로그램은 서울 열린데이터 광장에서 `서울시 지하철역 정보 검색 (역명)`라는 OpenAPI를 사용하고 있습니다. <br>
아래의 사이트에서 API Key를 받아서 사용해주셔야 합니다.<br>
<a href="http://data.seoul.go.kr/dataList/OA-121/A/1/datasetView.do">서울시 지하철역 정보 검색 (역명)</a>

<br>

### .env 환경 설정
```bash
# MongoDB URI
MONGODB_URI = "<위에서 만든 user에 대한 MongoDB URI 사용>"

# 서울 열린데이터 광장 API Key
API_KEY = "<위에서 발급 받은 서울 열린데이터 광장 API Key 사용>"

# Session 암호화 key
AUTHENTICATION_KEY = "<자신이 사용할 session secret key>"

# 앱 전용 접근 키
APP_KEY = "<자신이 사용할 앱 전용 접근 키>"
```

<br>

### 초기 세팅
.env 파일을 만들어서 넣어준 이후 다음과 같은 명령을 통해서 초기 세팅을 진행한다.

```bash
yarn install
```

<br>

## 테스트 환경
- Ubuntu OS : 22.04.2 LTS (Jammy Jellyfish)
- Node.js : v18.16.0 LTS
- Yarn : 1.22.19
- 사용 port : 8000(app.js), 3000(openapi.js)

<br>

### 서버 관리 모듈
- forever, nodemon 사용 <br>
    _빠른 설치 : `sudo bash setup.sh`_

<br>

## 빠른 실행
yarn-script를 통해 빠른 실행을 할 수 있다.
```bash
yarn app-start # app.js 실행(app 전용)
yarn openapi-start # openapi.js 실행(openapi 제공용)
yarn start # app.js와 openapi.js 한 번에 실행
```

<br>

## LICENSE
이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

