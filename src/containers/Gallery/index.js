import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination, Modal } from 'antd'
import { bindActionCreators } from 'redux'
import * as photoActions from '../../actions/photos.action'
import styles from './styles.module.scss'
import GalleryList from './Layouts/GalleryList'

class Gallary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openPreview: false,
      preview: {}
    }
  }

  componentDidMount () {
    const { actions } = this.props
    actions.storePhotos()
  }

  handlePagination = (page, pageSize) => {
    const { actions } = this.props
    actions.fetchNextBatch(page)
  }

  removeFromFavourite = (id) => {
    const { actions } = this.props
    actions.removeFav(id)
  }

  showPreivew = (id) => {
    const { photos } = this.props
    const preview = photos.find(x => x.id === id)
    this.setState({
      openPreview: true,
      preview
    })
  }

  addToFavourite = (id) => {
    const { actions } = this.props
    actions.selectFavImage(id)
  }

  render () {
    const { photos, favourite, total } = this.props
    const images = photos.map(m => {
      if (favourite.find(o => o.id === m.id)) {
        return {
          ...m, fav: true
        }
      } else {
        return {
          ...m, fav: false
        }
      }
    })
    const { preview, openPreview } = this.state
    return (
      <div className={styles.Gallary}>
        <div className={styles.Gallary__header}>
          <p>Gallery </p>
          <div className={styles.Gallary__header__right}>
            <Link className={styles.Gallary__header__link} to='/favourite'> My Favourite List({favourite.length}) </Link>
          </div>
        </div>
        <GalleryList
          data={images}
          addToFavourite={this.addToFavourite}
          showPreivew={this.showPreivew}
          removeFromFavourite={this.removeFromFavourite}
        />
        <div className={styles.Gallary__pagination}>
          <Pagination
            onChange={this.handlePagination}
            defaultCurrent={1}
            total={total}
            pageSize={15}
          />
        </div>
        <Modal
          visible={openPreview}
          title={false}
          onCancel={() => this.setState({ openPreview: false, preview: {} })}
          footer={false}
          width={500}
          header={false}
          closable={false}
        >
          <div className={styles.Gallary__preview}>
            <img src={preview.url} className={styles.Gallary__preview__img} />
          </div>

        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return({
    photos: state.photos.current,
    error: state.photos.error,
    isLoading: state.photos.loading,
    total: state.photos.total,
    favourite: state.photos.favourite
  })
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(photoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Gallary)
