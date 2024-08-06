import { createSlice } from '@reduxjs/toolkit'

export interface Article {
  title: string
}
export interface ArticleState {
  articles: Article[];
  error: string;
}

const initialState: ArticleState = {
  articles: [],
  error: ''
}

export const articleSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getArticlesSlice: (state, action) => {
      state.articles = action.payload
    },
    setErrorSlice: (state, action) => {
      state.error = action.payload
    },

  },
})

export const { getArticlesSlice, setErrorSlice } = articleSlice.actions

export default articleSlice.reducer