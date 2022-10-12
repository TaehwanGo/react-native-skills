# 14. Strapi로 REST API 서버 빠르게 구축하기

- 15장에서 사용할 react-query를 위해 사용할 REST API서버를 빠르고 쉽게 구축해보자

## 14.1 Strapi 살펴보기

- Strapi는 기본적으로 SQLite를 사용
- 별도의 Database 서버를 준비하지 않아도 바로 사용할 수 있음
- MySQL, MongoDB 등의 데이터베이스와 연동할 수도 있음

### 14.1.1 strapi 프로젝트 생성하기

> yarn create strapi-app articles-server --quickstart

- https://www.npmjs.com/package/strapi

- strapi 서버 시작
  - cd articles-server
  - yarn develop
    - 프로덕션 환경에선 yarn start
- 서버 URL
  - http://localhost:1337/admin
  - http://localhost:1337

## 14.2 새 콘텐트 타입 만들기

- 콘텐트 타입 : 등록할 수 있는 데이터의 타입
- user, comment collection type 생성

## 14.3 일부 필드를 Private로 변경하기

- Private로 변경하면 추후 API를 호출할 때 응답에서 해당 필드가 보이지 않음

## 14.4 데이터 권한 설정하기

- Setting > Roles
- Strapi의 Role 두 가지
  - 로그인한 사용자(Authenticated)
  - 로그인 하지 않은 사용자(Public)

## 14.5 Content API에 커스터마이징하기

- 로그인한 사용자 -> Article or Comment 작성 -> 로그인한 사용자의 정보를 데이터에 담는 작업
  - 커스텀 필요
- 자신의 데이터만 삭제 또는 수정할 수 있게 하기

  - 커스텀 필요

- API 작동 방식을 커스터마이징할 때는 controllers 디렉터리에 있는 파일을 수정

- 책과 npm 버전이 달라지면서 커스텀 방식도 변경 됨
  - strapi를 공부할 이유는 없다고 생각되어 velopert님의 레포에서 받아옴
  - https://github.com/velopert/articles-server
  - 설치하려 했으나 node 버전이 >=10.16.0 <=14.x.x 인데 내 버전은 16.15라서 설치가 안됨
  - nvm으로 변경 후 설치
  - 실행 : yarn develop
- 기존에 했던 설정 다시 해야 됨
