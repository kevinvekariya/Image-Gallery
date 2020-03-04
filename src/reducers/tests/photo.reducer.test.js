import { call, put, take } from 'redux-saga/effects';
import * as types from '../../actions/actionTypes'
import { expectSaga } from 'redux-saga-test-plan';
import { photoReducer } from '../photos.reducer'

const mock = [
    {
        id: 1,
        albumId: 2,
        title: 'Title',
        url: 'http://url.com',
        thumbnailUrl: 'http://thubmnailUrl.com'
    },
    {
        id: 2,
        albumId: 2,
        title: 'Title2',
        url: 'http://url2.com',
        thumbnailUrl: 'http://thubmnailUrl2.com'
    },
    {
        id: 3,
        albumId: 2,
        title: 'Title3',
        url: 'http://url3.com',
        thubmnailUrl: 'http://thumbnailUrl3.com'
    }
]

const initialStore  =  {
      loading: false,
      data: mock,
      current: mock,
      page: 1,
      total: 0,
      favourite: []
    
  }


function * saga() {
    yield put({ type: types.STORE_IMAGE_LOCAL, payload: mock })
}

function * addToFav(id) {
    yield put({ type: types.STORE_TO_FAVOURITE, id: { payload: 1 }  })
}

function * removeFav(params) {
    yield put({ type: types.DELETE_FROM_FAV, id: { payload: 1 } })
}

it("handle reducer and store images", () => {
    return expectSaga(saga)
    .withReducer(photoReducer)
    .hasFinalState({
        loading: false,
        data: mock,         
        current: mock,
        page: 1,
        total: mock.length,
        favourite: [] }).run()
})

it('should add image to favourite list', () => {
    return expectSaga(addToFav)
    .withReducer(photoReducer, initialStore)
    .hasFinalState({
        loading: false,
        data: mock,         
        current: mock,
        page: 1,
        total: 0,
        favourite: [
            {
                id: 1,
                albumId: 2,
                title: 'Title',
                url: 'http://url.com',
                thumbnailUrl: 'http://thubmnailUrl.com'
            }
        ]
    }).run()
})

it('should remove image from list', () => {
    return expectSaga(removeFav)
    .withReducer(photoReducer, {
        favourite: [
            {
                id: 1,
                albumId: 2,
                title: 'Title',
                url: 'http://url.com',
                thumbnailUrl: 'http://thubmnailUrl.com'
             },
             {
                id: 3,
                albumId: 2,
                title: 'Title3',
                url: 'http://url3.com',
                thubmnailUrl: 'http://thumbnailUrl3.com'
            }
    ]
    }).hasFinalState({
        favourite: [
            {
                id: 3,
                albumId: 2,
                title: 'Title3',
                url: 'http://url3.com',
                thubmnailUrl: 'http://thumbnailUrl3.com'
            }
        ]
    }).run()
})



