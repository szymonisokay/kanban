import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { useSearchParams } from 'react-router-dom'

import NotFound from '../notFound/NotFound'
import Board from '../board/Board'
import Breadcrumb from '../breadcrumb/Breadcrumb'

const dummyBoardData = [
  {
    id: 1,
    name: 'First project',
  },
  {
    id: 2,
    name: 'Second project',
  },
  {
    id: 3,
    name: 'Third project',
  },
]

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <header className='header'>
        <Breadcrumb />
      </header>
    </div>
  )
}

export default Dashboard
