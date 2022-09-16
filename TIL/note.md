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

## Android 에뮬레이터에서 localhost 서버 연결

- 로컬 서버로 테스트하기 위해 react native 앱에서 localhost로 요청을 보냈더니 Network Error가 발생했다
- 처음에 잘 못 접근해서 Android 설정 파일의 Flipper 플러그인을 비활성화 하게 했었지만 효과가 없었다
  - https://coding-w00se.tistory.com/11
  - 이 경우는 자세히 보니 파일 업로드할 때 발생하는 에러였다
  - 지금 만들고 있는 앱에선 파일 업로드할 일이 없지만 나중에 만약 이런 상황이 발생한다면 Flipper를 비활성화해볼 수도 있을 것 같다
- 그래서 다시 찾아보니
  - https://velog.io/@kyoungwoo95/RNReact-Native-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-7-Android-%EC%97%90%EC%84%9C-Redux-%EB%94%94%EB%B2%84%EA%B9%85%ED%95%98%EA%B8%B0
  - 이 블로그 글에서 4번인 localhost의 포트를 안드로이드 애뮬레이터의 IP주소로 바꿔주니 해결이 되었다

## TextInput ref

- react native에서도 ref를 붙여서 무언가를 할 수 있었다
- 그런데 웹의 input 태그에서와 같이 직접 value를 가져오는 방식은 잘 몰라서 따로 text를 실시간으로 담는 useRef를 별도로 만들어서 관리했다
- TextInput ref에서 제공하는 메서드 중에 clear가 있어서 필요시 clear를 할 수 있도록 설정하였다

## Image태그에 클릭이벤트

- react native는 onClick 대신 onPress를 사용한다
- 그런데 Image태그는 어떤 것도 메서드로 제공하지 않아서 onPress를 제공하는 태그를 따로 감싸줘야했다
- 그래서 여러가지가 있지만 노마드코더 수업때 배운 Pressable을 사용했다
  - https://reactnative.dev/docs/pressable
  - 비슷한 태그로 Touchable 시리즈가 있는데 다른 것들은 클릭시 이펙트가 있어서 TouchableWithoutFeedback을 쓸 수 있지만
  - 공식문서에서도 Pressable을 더 추천하기에 사용하였다
