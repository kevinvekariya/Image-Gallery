import React from 'react'
import { Icon } from 'antd'
import styles from '../styles.module.scss'

function GalleryCard (
  {
    card,
    onlyPreview,
    showPreivew,
    removeFromFavourite = () => {},
    addToFavourite = () => {},
    onDrop,
    onDragOver,
    onDragStart
  }) {
  const { thumbnailUrl, id, fav } = card
  return (
    <>
      <div className={styles.GallaryCard}>
        <div onClick={() => showPreivew(id)}>
          <img
            src={thumbnailUrl}
            className={styles.GallaryCard__image}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
          />
        </div>
        {
          !onlyPreview &&
            <div
              className={styles.GallaryCard__favImg}
              onClick={!fav ? () => addToFavourite(id) : () => removeFromFavourite(id)}
            >
              {fav
                ? <Icon type='heart' theme='filled' />
                : <Icon type='heart' />}
            </div>
        }

      </div>

    </>
  )
}

export default GalleryCard
