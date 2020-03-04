import {
  // call,
  put,
  all,
  // take,
  takeEvery
  // select,
  // actionChannel
} from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import axios from 'axios'

function * fetchPhotos (action) {
  try {
    // const { subscriber } = action
    const response = yield axios.get('https://jsonplaceholder.typicode.com/photos')
    yield put({ type: types.STORE_IMAGE_LOCAL, payload: response.data })
  } catch (err) {
    yield put({ type: types.IMAGE_ERR, err })
  }
}

export function * nextBatch (pageNo) {
  yield put({ type: types.FETCH_NEXT_BATCH, data: pageNo })
}

export function * addToFav (id) {
  yield put({ type: types.STORE_TO_FAVOURITE, id })
}

export function * removeFav (id) {
  yield put({ type: types.DELETE_FROM_FAV, id })
}

export function * photoSaga () {
  yield all([
    takeEvery(types.STORE_IMAGE, fetchPhotos),
    takeEvery(types.STORE_NEXT_BATCH, nextBatch),
    takeEvery(types.ADD_TO_FAV, addToFav),
    takeEvery(types.REMOVE_FROM_FAV, removeFav)
  ])
}
