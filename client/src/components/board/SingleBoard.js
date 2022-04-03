import React from 'react'
import styles from './SingleBoard.module.css'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../breadcrumb/Breadcrumb'

const SingleBoard = () => {
  const params = useParams()
  console.log(params)
  return (
    <div className={styles.single_board}>
      <header className='header'>
        <Breadcrumb />
      </header>
    </div>
  )
}

export default SingleBoard
