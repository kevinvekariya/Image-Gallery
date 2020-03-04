import * as type from './actionTypes'

export const storePhotos = (photos) => {
  return { type: type.STORE_IMAGE, payload: photos }
}

export const fetchNextBatch = (pageNo) => {
  return { type: type.STORE_NEXT_BATCH, payload: pageNo }
}

export const selectFavImage = (id) => {
  return { type: type.ADD_TO_FAV, payload: id }
}

export const removeFav = (id) => {
  return { type: type.REMOVE_FROM_FAV, payload: id }
}

export const dragImages = (source, target) => {
  return { type: type.DRAG_IMAGE, payload: { source, target } }
}
