import { combineReducers } from 'redux'
import { photoReducer } from './photos.reducer'

export default combineReducers({
  photos: photoReducer
})
