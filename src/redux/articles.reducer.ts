import { createSlice } from '@reduxjs/toolkit'

export interface Article {
  title: string
}
export interface ArticleState {
  articles: Article[]
}

const initialState: ArticleState = {
  articles: [],
}

export const articleSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getArticlesSlice: (state, action) => {
      state.articles = action.payload
    },

  },
})

export const { getArticlesSlice } = articleSlice.actions

export default articleSlice.reducer