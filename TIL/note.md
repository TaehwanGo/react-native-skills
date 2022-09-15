# 2022.09.14

- flexShrink

  - flex로 화면 비율을 조정할 경우 가상 키보드가 올라오면 화면 비율이 같이 줄어들어서 배치가 깨지는 현상이 있었다
  - flexShrink로 바꿔서 해당 현상을 막는 것을 보았다
  - 웹 CSS에서도 flex-shrink, flex-grow 등이 있다
    - https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
    - https://blogpack.tistory.com/863

- react-native 개발 환경 세팅

  - 진행중

- 무한 스크롤
  - https://velog.io/@blacksooooo/React-native-%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B7%B8%EB%9E%A8-%ED%94%BC%EB%93%9C%EC%99%80-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-Refresh-%EC%83%81%EB%8B%A8-%EC%8A%A4%ED%86%A0%EB%A6%AC-%EA%B5%AC%ED%98%84-FlatList-%EC%9D%B4%EC%9A%A9

# 2022.09.15

## Android SDK target version ?

- compile과 target 각각 뭘 의미하는 것일까?
- https://duzi077.tistory.com/141
- https://developer.android.com/distribute/best-practices/develop/target-sdk?hl=ko
- https://vagabond95.me/posts/android-api-version-manage/

### 상위호환성, 하위호환성

- 안드로이드는 상위호환성을 중요시하기 때문에 compileSdkVersion, minSdkVersion, targetSdkVersion 라는 개념이 있다
- 상위호환성 : 예전 버전이 최신 단말기에서 실행이 잘 된다면 '상위 호환'
- 하위호환성 : 이전 버전에서 만든 입력값을 처리할 수 있다면 '하위 호환'

### compile SDK version

- 어떤 SDK 버전으로 앱을 컴파일 할 것인지 알려줌
  - 지원할 수 있는 가장 높은 API 버전
  - 최신 버전의 SDK로 지정하는 것이 좋습니다
  - import문으로 참조되는 클래스나 메소드를 찾을 때 어떤 버전의 SDK에서 찾을 것인가를 결정

### min SDK version

- min SDK version 보다 낮은 API 버전 앱은 설치할 수 없습니다

### target SDK version

- min SDK version 이상에서 지원하는 어떤 기능을 사용하고자 위함
- 실제 컴파일엔 관여하지 않음
- 빌드 시 버전을 낮추어도 원하는 클래스의 메소드를 컴파일 할 수 있음
- 지정한 버전까지 앱을 테스트 했음을 의미

### SDK 버전 관계

min <= target <= compile

### 안정적인 앱을 원한다면

min <= target == compile

### 결론

- min은 낮은 것으로 놔두고 target과 compile은 최신버전으로 유지하자

## FlatList(무한 스크롤)

- ScrollView 없이도 스크롤 가능
- 다양한 props 지원함
  - 무한스크롤 쉽게 가능
  - empty일 때 화면도 설정 가능
  - 로딩 스피너 지원
