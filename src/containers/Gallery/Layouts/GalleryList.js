import React from 'react'
import styles from '../styles.module.scss'
import GalleryCard from './GalleryCard'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { dragImages } from '../../../actions/photos.action'
import Modal1 from '../../Modals'

const GalleryList = ({ data = [], showPreivew, addToFavourite, removeFromFavourite, dragImages }) => {
  const [source, setSource] = React.useState({
    idx: -1,
    url: ''
  })
  const [target, setTarget] = React.useState({
    idx: -1,
    url: ''
  })
  const [showModal, toggleModal] = React.useState(false)

  const dropImage = (e, i) => {
    e.preventDefault()
    const targetSrc = e.target.src
    toggleModal(!showModal)
    setTarget({
      idx: i,
      url: targetSrc
    })
  }

  const toggleReplacementModal = () => {
    toggleModal(!showModal)
  }

  const handleImageSwap = () => {
    dragImages(source, target)
  }

  const dragImage = (e, i) => {
    setSource({
      idx: i,
      url: e.target.src
    })
  }

  return (
    <div className={styles.GallaryList}>
      {
        data.map((o, i) => (
          <GalleryCard
            showPreivew={showPreivew}
            removeFromFavourite={removeFromFavourite}
            addToFavourite={addToFavourite}
            card={o}
            key={o.id}
            onDrop={(e) => dropImage(e, i)}
            onDragOver={(e) => { e.preventDefault() }}
            onDragStart={(e) => dragImage(e, i)}
          />
        ))
      }
      <Modal1 onClose={toggleReplacementModal} visible={showModal} onOk={handleImageSwap} />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      dragImages
    }, dispatch
  )
}

export default connect(null, mapDispatchToProps)(GalleryList)
