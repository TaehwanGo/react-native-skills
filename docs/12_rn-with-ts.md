# 12장. 리액트 네이티브 프로젝트에서 타입스크립트 사용하기

## 12.1 ~ 12.2 타입스크립트 설명

- 생략

## 12.3 타입스크립트로 컴포넌트 작성하기

### 12.3.1 Props 사용하기

#### 12.3.1.1 옵셔널 Props 사용하기

#### 12.3.1.2 기본값 Props 사용하기

- 랜덤 사진 제공 사이트
  - https://picsum.photos/

#### 12.3.1.3 children Props 사용하기

### 12.3.2 useState 사용하기

### 12.3.3 useRef 사용하기

### 12.3.4 useReducer 사용하기

- React 16.8 버전부터 추가된 hook인데 사용을 해본적이 없었다
- useState를 대체할 수 있는 hook인데 사실 번거로워서 잘 안쓸 것 같긴 하다
- 그래도 미니 Redux 같아서 귀엽고 신기하다

## 12.4 타입스크립트로 Context API 사용하기

- context(AuthContext.tsx)를 만들고 해당 컨텍스트에 포함된 것들을 사용할 수 있는 hook(useAuth)을 만들어서 제공하는 것이 안전하다

## 12.5 타입스크립트로 react-navigation 사용하기

### 12.5.1 라이브러리 설치하기

- yarn add @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/native-stack @react-navigation/bottom-tabs
  - @react-navigation/native
    - navigation 통합
    - https://reactnavigation.org/docs/getting-started/
  - react-native-screens
    - navigation에서 필요
  - react-native-safe-area-context
    - navigation에서 필요
  - @react-navigation/native-stack
    - 탐색을 위한 기본 기본 요소를 사용하는 React Native용 stack navigator.
  - @react-navigation/bottom-tabs
    - iOS 디자인 지침에 따른 React Navigation용 하단 탭 탐색기.

### 12.5.2 네이티브 스택 네비게이션 사용하기

- 네이티브 스택 네비게이션에서 사용할 화면 타입 선언
  - interface가 아닌 type으로 선언해야 함

```ts
export type RootStackParamList = {
  Home: undefined;
  Details: {
    id: number;
  };
};

// RootStack.tsx
const Stack = createNativeStackNavigator<RootStackParamList>();
```

- useNavigation에 타입 지정하기

```ts
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const navigation = useNavigation<RootStackNavigationProp>();
```

### 12.5.2.3 useRoute 사용하기

- Stack으로 쌓여진 컴포넌트(Screen)엔 자동으로 props에 navigation과 route이 prop으로 전달된다
- 그것들을 사용했었는데 타입을 정의하려고 했는데 잘 찾지 못했어서 불편했는데
- useNavigation과 useRoute을 사용하면 타입도 지정할 수 있고
  Stack컴포넌트가 아닌 다른 컴포넌트에서도 사용할 수 있는 것 같아 훨씬 편하고 좋은 것 같다

#### SafeAreaView

- react native에서 제공하는 것과
- react-native-safe-area-context 제공하는 것이 있다
- 차이점은 기본으로 제공되는 것은 animating 이슈가 있기에(정확하게는 모름)
  더 안전하게 처리하려면 react-native-safe-area-context의 SafeAreaView를 사용하는 것이
  더 좋다고 한다
  - https://stackoverflow.com/questions/61887661/what-are-the-differences-between-different-implementations-of-safeareaview/67264221#67264221

### 12.5.3 네비게이션 감싸기

- 하단 탭 네비게이션
- 하단 탭 네비 적용

#### 만약 MainTab 내부에서 또 다른 네비게이터를 사용한다면

- CompositeNavigationProp을 또 사용하면 된다

```ts
// 예시 코드
// MainTab.tsx
type AccountStackParamList = {
  Account: undefined;
  Setting: undefined;
};

export type AccountStackNavigationProp = CompositeNavigationProp<
  MainTabNavigationProp,
  StackNavigationProp<AccountStackParamList>
>;
```
