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

## 14.6 Postman 설치 후 요청 테스트

## 14.7 회원가입 및 로그인 API 사용하기

- Strapi에서 소셜 로그인도 설정하면 사용할 수 있지만
- 이메일 인증 방식만 사용

#### 회원가입 API

```JSON
// POST http:localhost:1337/auth/local/register
{
  "username": "tony",
  "email": "gth1123@naver.com",
  "password": "abcd1234"
}
```

#### 로그인 API

```json
// POST http://localhost:1337/auth/local
{
  "identifier": "gth1123@naver.com",
  "password": "abcd1234"
}
```

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY1NjY4NjkxLCJleHAiOjE2NjgyNjA2OTF9.ZwwsJdBxh6BZK0E2NwJcFaC0B6jCFM0RII1VAAvkczE",
  "user": {
    "id": 1,
    "username": "tony",
    "email": "gth1123@naver.com",
    "provider": "local",
    "confirmed": true,
    "blocked": null,
    "role": {
      "id": 1,
      "name": "Authenticated",
      "description": "Default role given to authenticated user.",
      "type": "authenticated"
    },
    "created_at": "2022-10-13T13:44:51.866Z",
    "updated_at": "2022-10-13T13:44:51.878Z"
  }
}
```

- jwt: JSON Web Token
  - JSON을 base64로 인코딩하고 해당 데이터에 서명을 추가하는 방식

## 14.8 Article API 사용하기

```json
// POST http://localhost:1337/articles
{
  "title": "첫 게시글",
  "body": "hello world"
}
```

- 403 forbidden

- jwt 토큰 사용
  - header에 Authorization : Bearer {토큰}
    - Bearer(운반자) : 토큰 인증 타입
    - jwt 같이 특정 접근 권한을 증명하기 위한 토큰 값을 Authorization 정보로 사용할 때는 Bearer를 사용

```json
// 응답
{
  "id": 1,
  "title": "첫 게시글",
  "body": "hello world",
  "user": {
    "id": 1,
    "username": "tony",
    "email": "gth1123@naver.com",
    "provider": "local",
    "confirmed": true,
    "blocked": null,
    "role": 1,
    "created_at": "2022-10-13T13:44:51.866Z",
    "updated_at": "2022-10-13T13:44:51.878Z"
  },
  "published_at": "2022-10-13T14:02:53.126Z",
  "created_at": "2022-10-13T14:02:53.136Z",
  "updated_at": "2022-10-13T14:02:53.144Z"
}
```

## 14.9 Comment API 수정하기

- 레포에서 받아왔기 때문에 수정이 되어 있음

## 14.10 댓글 API 사용

- 댓글을 작성해보자

```json
// POST http://localhost:1337/articles/1/comments
{
  "message": "hi hi",
}

// 응답
{
    "id": 1,
    "message": "hi hi",
    "user": {
        "id": 1,
        "username": "tony",
        "email": "gth1123@naver.com",
        "provider": "local",
        "confirmed": true,
        "blocked": null,
        "role": 1,
        "created_at": "2022-10-13T13:44:51.866Z",
        "updated_at": "2022-10-13T13:44:51.878Z"
    },
    "published_at": "2022-10-13T14:14:15.238Z",
    "created_at": "2022-10-13T14:14:15.240Z",
    "updated_at": "2022-10-13T14:14:15.243Z"
}
```

```json
// GET http://localhost:1337/ariticle/1/comments

[
  {
    "id": 1,
    "message": "hi hi",
    "user": {
      "id": 1,
      "username": "tony",
      "email": "gth1123@naver.com",
      "provider": "local",
      "confirmed": true,
      "blocked": null,
      "role": 1,
      "created_at": "2022-10-13T13:44:51.866Z",
      "updated_at": "2022-10-13T13:44:51.878Z"
    },
    "published_at": "2022-10-13T14:14:15.238Z",
    "created_at": "2022-10-13T14:14:15.240Z",
    "updated_at": "2022-10-13T14:14:15.243Z"
  }
]
```

## 14.11 정리

- Strapi를 사용하여 REST API 서버를 구축
