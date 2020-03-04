import { all } from 'redux-saga/effects'
import { photoSaga } from './photo.saga'

export default function * rootSaga () {
  yield all([
    photoSaga()
  ])
}
