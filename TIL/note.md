# 2022.09.14

- flexShrink
  - flex로 화면 비율을 조정할 경우 가상 키보드가 올라오면 화면 비율이 같이 줄어들어서 배치가 깨지는 현상이 있었다
  - flexShrink로 바꿔서 해당 현상을 막는 것을 보았다
  - 웹 CSS에서도 flex-shrink, flex-grow 등이 있다
    - https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
    - https://blogpack.tistory.com/863
