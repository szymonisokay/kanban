import React from 'react'
import styles from './Teams.module.css'
import Breadcrumb from '../breadcrumb/Breadcrumb'

const Teams = () => {
  return (
    <div className={styles.teams}>
      <div className='header'>
        <Breadcrumb />
      </div>
    </div>
  )
}

export default Teams
