import React from 'react'
import { useSelector } from 'react-redux'
import GalleryCard from './GalleryCard'
import styles from '../styles.module.scss'
import { Link } from 'react-router-dom'

function Favourite (props) {
  const images = useSelector(state => state.photos.favourite) || []
  return (
    <div className={styles.Favourite}>
      <div className={styles.Favourite__header}>
        <p> My Favourite List({images.length}) </p>
        <div className={styles.Favourite__header__link}> <Link to='/'>Go to gallary</Link> </div>
      </div>
      <div className={styles.Favourite__body}>
        {
          images.length === 0 &&
            <p> No Favourite Images found. </p>
        }
        {
          images.map(o => (
            <GalleryCard showPreivew={() => {}} onlyPreview card={o} key={o.id} />
          ))
        }
      </div>
    </div>
  )
}

export default Favourite
