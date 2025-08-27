import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { HomePageRedux } from './homePage.js'

import logger from 'redux-logger'

const rootReducer = combineReducers({
  homePage: HomePageRedux,
})

export const ConfigureStore = () => {
  const middleware = (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware()
    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger)
    }
    return middlewares
  }

  return configureStore({
    reducer: rootReducer,
    middleware,
  })
}
