import React, { useEffect, useState } from 'react'
import styles from './Sidebar.module.css'
import { Link, useLocation } from 'react-router-dom'

import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupsIcon from '@mui/icons-material/Groups'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'

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
  const location = useLocation()

  return (
    <div className={styles.sidebar}>
      <div className={styles.user}>
        <img
          src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          alt='Person'
        />
        <div>
          <span>John Doe</span>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.sidebar__menu}>
        <nav>
          <ul>
            <li
              className={location.pathname === '/' ? styles.active : undefined}
            >
              <Link to='/'>
                <HomeIcon />
                <span>Dashboard</span>
              </Link>
            </li>
            <li
              className={
                location.pathname.includes('/boards')
                  ? styles.active
                  : undefined
              }
            >
              <Link to='/boards'>
                <DashboardIcon />
                <span>Boards</span>
              </Link>
            </li>
            <li
              className={
                location.pathname.includes('/teams') ? styles.active : undefined
              }
            >
              <Link to='/teams'>
                <GroupsIcon />
                <span>Teams</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.logout}>
          <ul>
            <li>
              <Link to='/'>
                <LogoutIcon />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <span>&copy; {new Date().getFullYear()} Szymon Wałach</span>
      </div>
    </div>
  )
}

export default Sidebar
