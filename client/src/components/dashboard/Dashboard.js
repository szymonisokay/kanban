import React, { useEffect } from 'react'
import styles from './Dashboard.module.css'

import Breadcrumb from '../breadcrumb/Breadcrumb'
import Boards from '../board/Boards'
import Loading from '../loading/Loading'

import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getBoards } from '../../features/boards/boardSlice'

const boardsData = [
  {
    id: '1',
    name: 'Board 1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel erat ligula. Proin vestibulum vel felis eget rutrum. Phasellus arcu velit, vulputate at bibendum id, ullamcorper a mi. Ut eget mi non eros posuere porta. Morbi maximus tellus eget dapibus porttitor. Nunc a lectus lacinia ligula sodales efficitur. Donec consectetur ante sed augue finibus, gravida mattis erat sollicitudin. ',
    tasks: [
      {
        id: 'task1',
        name: 'Board 1 task 1',
      },
      {
        id: 'task2',
        name: 'Board 1 task 2',
      },
      {
        id: 'task2',
        name: 'Board 1 task 2',
      },
    ],
    users: [
      {
        id: 'user1',
        image:
          'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: 'User 1',
      },
      {
        id: 'user2',
        image:
          'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: 'User 2',
      },
      {
        id: 'user3',
        image:
          'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: 'User 3',
      },
    ],
    createdAt: '10 Feb',
  },
  {
    id: '2',
    name: 'Board 2',
    tasks: [
      {
        id: 'task1',
        name: 'Board 2 task 1',
      },
      {
        id: 'task2',
        name: 'Board 2 task 2',
      },
      {
        id: 'task2',
        name: 'Board 2 task 2',
      },
    ],
    users: [
      {
        id: 'user1',
        image:
          'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: 'User 1',
      },
      {
        id: 'user2',
        image:
          'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: 'User 2',
      },
    ],
    createdAt: '10 Feb',
  },
  {
    id: '3',
    name: 'Board 3',
    tasks: [
      {
        id: 'task1',
        name: 'Board 3 task 1',
      },
      {
        id: 'task2',
        name: 'Board 3 task 2',
      },
      {
        id: 'task2',
        name: 'Board 3 task 2',
      },
    ],
    users: [
      {
        id: 'user1',
        image:
          'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: 'User 1',
      },
      {
        id: 'user2',
        image:
          'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: 'User 2',
      },
    ],
    createdAt: '10 Feb',
  },
  {
    id: '4',
    name: 'Board 4',
    tasks: [
      {
        id: 'task1',
        name: 'Board 4 task 1',
      },
      {
        id: 'task2',
        name: 'Board 4 task 2',
      },
      {
        id: 'task2',
        name: 'Board 4 task 2',
      },
    ],
    users: [
      {
        id: 'user1',
        image:
          'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: 'User 1',
      },
      {
        id: 'user2',
        image:
          'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: 'User 2',
      },
    ],
    createdAt: '10 Feb',
  },
]

const Dashboard = () => {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.board)

  useEffect(() => {
    dispatch(getBoards())
  }, [dispatch])

  return (
    <div className={styles.dashboard}>
      <header className='header'>
        <Breadcrumb />
      </header>
      <div className={styles.dashboard_content}>
        <div className={styles.dashboard_content__header}>
          <h3>
            <Link to='/boards'>Boards</Link>
          </h3>
          <button>
            <AddIcon />
            <span>Add board</span>
          </button>
        </div>
        {boards.status === 'loading' && <Loading />}
        {boards.status === 'success' && <Boards boards={boards.value} />}

        <div className={styles.dashboard_content__header}>
          <h3>
            <Link to='/teams'>Teams</Link>
          </h3>
          <button>
            <AddIcon />
            <span>Add Team</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
