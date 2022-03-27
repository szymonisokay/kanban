import React from 'react'
import styles from './NotFound.module.css'
import not_found_image from '../../images/not_found.svg'

import AddIcon from '@mui/icons-material/Add'

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <div>
        <img src={not_found_image} alt='Not found' />
        <h3>No board selected!</h3>
        <p>Select board from the menu</p>
        <div className={styles.divider}>
          <hr />
          <p>or</p>
        </div>
        <button>
          <AddIcon />
          <span>Create new board</span>
        </button>
      </div>
    </div>
  )
}

export default NotFound
