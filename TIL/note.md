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
  - 이 블로그 글에서 4번인 URL에서 localhost를 안드로이드 애뮬레이터의 IP주소로 바꿔주니 해결이 되었다

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

# 2022.09.19

## 가상 키보드가 TextInput 화면을 가리는 경우

- `KeyboardAvoidingView` 컴포넌트로 감싸면 해당 컴포넌트로 감싼 부분이 가상 키보드 만큼 올라간다
- 이때 글자가 겹쳐보이는 이슈가 생길 수 있는데 `ScrollView`로 감싸주면 겹쳐보이는 문제를 해결할 수 있다

## react native 실제 기기 연결(안드로이드)

- https://ehddud100677.tistory.com/m/387
  - 설정 > 휴대전화 정보 > 소프트웨어 정보 > 빌드 번호(여러번 클릭) > 개발자 모드 생김
  - 개발자모드 > usb 디버깅 활성화
  - adb devices 명령어로 디바이스 연결된 것 확인
  - 기기 포트 변경 : adb reverse tcp:8081 tcp:8081
  - npm run android 명령어로 실행

## 안드로이드 기기에서 로컬서버(localhost) 접속

- https://leenow.tistory.com/7
  - 에뮬레이터는 에뮬레이터 주소로 연결해야 내 컴퓨터의 local서버(localhost)와 연결되지만
  - 실 기기에선 같은 와이파이에 접속 후 내 컴퓨터의 ip주소를 확인해서 연결해줘야 한다

# 2022.09.20

## QR 코드

### QR코드 동작 원리

- https://codingcoding.tistory.com/95
- Quick Response
- 빛을 흡수하는 검은색과 빛을 반사하는 흰색으로 조합하여 문자열을 저장하는 것
- 바코드보다 더 많은 정보를 저장할 수 있다
  - 바코드 : 20여자의 숫자 정보
  - QR코드 : 숫자 최대 7,079 | 문자 최대 4,296 | 한자 최대 1,817

### QR코드 생성 사이트

- 구글에 `QR코드 생성`이라고 검색하면 나온다
  - https://ko.qr-code-generator.com/
- QR코드를 임의로 생성해서 테스트를 할 수 있다

# 2022.09.21

## 세로 화면만 지원

- 아직 앱 개발에 능숙하지 않아서 가로화면까지 반응형이 지원되는 앱을 만들기 어려웠다
- 그래서 세로화면만 지원이 되게 설정하였다

### 안드로이드 세로화면 고정하기

```xml
<activity
        ...
        android:screenOrientation="portrait"
```

- android/app/src/main/AndroidManifest.xml 에서 위와 같이 코드 추가

### IOS 세로화면 고정하기

ios/{프로젝트\_이름}/Info.plist

```jsx
<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationPortrait</string>
		// <string>UIInterfaceOrientationLandscapeLeft</string>
		// <string>UIInterfaceOrientationLandscapeRight</string>
```

- // 표시한 부분 삭제

## React native styling

### Text 글자수 제한

- numberOfLines에 제한할 줄수를 전달
- ellipsizeMode="tail" 로 말 줄임표 표시

# 2022. 9. 23.

## Javascript 프로젝트를 Typescript로 전환하기

### 공식 Typescript template과 비교하면서 전환

- https://reactnative.dev/docs/typescript

### 기존 자바스크립트 프로젝트와 위 템플릿 프로젝트를 비교

- 타입스크립트 프로젝트에 필요한 패키지를 설치
  - "@tsconfig/react-native"
  - "@types/jest"
  - "@types/react-native"
  - "@types/react-test-renderer"
  - "@typescript-eslint/eslint-plugin"
  - "@typescript-eslint/parser"
  - "react-test-renderer"
  - "typescript"
- 기존에 설치했던 라이브러리 중 타입스크립트 지원 패키지를 따로 설치해야하는 것이 있는지 확인
  - 다 지원하고 있어서 따로 추가 설치할 필요가 없었음

### Typescript 설정

- tsconfig

```json
// prettier-ignore
{
  "extends": "@tsconfig/react-native/tsconfig.json",     /* Recommended React Native TSConfig base */
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */
    /* Completeness */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

- @tsconfig/react-native/tsconfig.json을 눌러보면 이미 필요한 세팅이 되어있어서
- 그것을 extends하므로 추가적 설정할 부분이 거의 없는 것 같았다

### 기존 자바스크립트 파일들을 타입스크립트 파일로 변경

- js -> ts | tsx 로 변경
  - 타입이 지정되지 않은 부분은 타입을 전부 지정해서 에러 해결

### 후기

- 생각보다 설정할 부분이 거의 없어서 오래걸리지 않았다
- 자바스크립트파일을 타입스크립트로 바꾸면서 타입을 지정해야하는 것은 익숙하므로 어렵지 않았다
- 타입스크립트로 전환하고 보니 기존에 몰랐던 버그를 찾을 수 있어서 좋았다
- 타입스크립트는 짱이다 !

## SafeAreaView

- https://reactnative.dev/docs/safeareaview
- SafeAreaView의 목적은 장치의 안전 영역 경계 내에서 콘텐츠를 렌더링하는 것입니다.
- 현재 iOS 버전 11 이상이 설치된 iOS 기기에만 적용됩니다.
- 안드로이드엔 적용이 안된다 해골물이었다

```jsx
<StatusBar translucent backgroundColor="transparent" />
```

- translucent 이 녀석이 문제였다
- flex와 justifyContent로 padding 없이 위쪽 컨텐츠에 정렬을 한 경우
  - 컨텐츠가 가상 키보드에 의해 밀리면 StatusBar 영역을 침범하게 되는데
  - padding을 줘서 해결할 수 있다

# 2022. 9. 29

## HTTPS

- API서버에 https를 적용했는데 아래와 같은 에러가 발생했다
  - java.security.cert.CertPathValidatorException: Trust anchor for certification path not found.
  - 처음엔 인증서 문제 같아서 서버 개발자에게 말을 했지만
  - 안드로이드 버전이 낮은 기기에서 인증서를 지원하지 않는 에러 같았다(아직 추측)
    - https://stackoverflow.com/questions/51363855/how-to-configure-axios-to-use-ssl-certificate
    - 내일 출근하면 다시 시도해봐야겠다
