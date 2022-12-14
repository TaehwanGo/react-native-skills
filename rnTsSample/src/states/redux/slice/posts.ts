import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPosts } from '../../../api/getPosts';
import { Post } from '../../../types/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', getPosts);

interface PostsState {
  posts: {
    loading: boolean;
    data: Post[] | null;
    error: Error | null;
  };
}

const initialState: PostsState = {
  posts: {
    loading: false,
    data: null,
    error: null,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending.type]: (state) => {
      state.posts = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [fetchPosts.fulfilled.type]: (state, action: PayloadAction<Post[]>) => {
      state.posts.data = action.payload;
      state.posts.loading = false;
    },
    [fetchPosts.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.posts.error = action.payload;
      state.posts.loading = false;
    },
  },
});

export default postsSlice.reducer;
