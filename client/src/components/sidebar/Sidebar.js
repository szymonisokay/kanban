import React, { useEffect, useState } from 'react'
import styles from './Sidebar.module.css'
import { useSearchParams, Link } from 'react-router-dom'

import DashboardIcon from '@mui/icons-material/Dashboard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LogoutIcon from '@mui/icons-material/Logout'
import AddIcon from '@mui/icons-material/Add'

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

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState(0)
  const [search, setSearch] = useSearchParams()

  const openBoard = (id) => {
    setSearch({ board: id })
  }

  useEffect(() => {
    setActive(+search.get('board'))
  }, [search])

  return (
    <div className={styles.sidebar}>
      <Link to='/'>
        <div className={styles.user}>
          <img
            src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='person'
          />
          <span>John Doe</span>
        </div>
      </Link>
      <div className={styles.board_list}>
        <p
          className={expanded ? styles.expanded : undefined}
          onClick={() => setExpanded(!expanded)}
        >
          <DashboardIcon />
          <span>Boards</span>
          <ExpandMoreIcon className={styles.expanded_icon} />
        </p>
        <div
          className={`${styles.boards_menu} ${
            expanded ? styles.expanded : undefined
          }`}
        >
          <ul>
            {dummyBoardData.map((board) => (
              <li
                key={board.id}
                className={active === board.id ? styles.active : undefined}
                onClick={() => openBoard(board.id)}
              >
                {board.name}
              </li>
            ))}
          </ul>
          <p>
            <AddIcon />
            <span>Add new board</span>
          </p>
        </div>
      </div>
      <div className={styles.logout}>
        <p>
          <LogoutIcon /> <span>Logout</span>
        </p>
      </div>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Szymon Wałach
      </div>
    </div>
  )
}

export default Sidebar
