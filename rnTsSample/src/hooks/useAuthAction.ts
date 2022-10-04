import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authorize, logout } from '../states/redux/slice/auth';

export default function useAuthAction() {
  const dispatch = useDispatch();

  // return {
  //   authorize: (user: User) => dispatch(authorize(user)),
  //   logout: () => dispatch(logout()),
  // };

  // 위 코드를 아래 코드로 축약 가능
  // useMemo를 사용하는 이유 : useEffect에서 이 액션 생성함수를 사용하면 의도치 않은 버그가 발생할 수 있기 때문
  return useMemo(
    () => bindActionCreators({ authorize, logout }, dispatch),
    [dispatch],
  );
}
