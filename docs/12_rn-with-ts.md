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
