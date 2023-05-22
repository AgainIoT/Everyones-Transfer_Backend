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
```

<br>

### 초기 세팅
.env 파일을 만들어서 넣어준 이후 다음과 같은 명령을 통해서 초기 세팅을 진행한다.

```bash
yarn install
```