import React from 'react'
import styles from './Boards.module.css'
import Breadcrumb from '../breadcrumb/Breadcrumb'
import Board from './Board'

const boardsData = [
  {
    id: '1',
    name: 'Board 1',
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
        image: '',
        name: 'User 1',
      },
      {
        id: 'user2',
        image: '',
        name: 'User 2',
      },
    ],
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
        image: '',
        name: 'User 1',
      },
      {
        id: 'user2',
        image: '',
        name: 'User 2',
      },
    ],
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
        image: '',
        name: 'User 1',
      },
      {
        id: 'user2',
        image: '',
        name: 'User 2',
      },
    ],
  },
]

const Boards = () => {
  return (
    <div className={styles.boards}>
      <header className='header'>
        <Breadcrumb />
      </header>
      <div className={styles.boards__content}>
        {boardsData.map((board) => (
          <Board key={board.id} {...board} />
        ))}
      </div>
    </div>
  )
}

export default Boards
