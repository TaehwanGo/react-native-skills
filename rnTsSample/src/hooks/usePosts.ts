import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../states/redux/slice';
import { fetchPosts } from '../states/redux/slice/posts';

export default function usePosts(enabled: boolean = true) {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();
  const fetchData = useCallback(() => {
    // @ts-ignore
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    fetchData();
  }, [enabled, fetchData]);

  return {
    ...posts,
    refetch: fetchData,
  };
}
