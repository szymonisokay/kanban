import React, { useState } from 'react'
import styles from './Header.module.css'
import { Link, NavLink } from 'react-router-dom'
import {
  Typography,
  Avatar,
  IconButton,
  Box,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { ExpandMore, AccountCircleOutlined, Logout } from '@mui/icons-material'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to='/'>
          <Typography variant='h6' color='dark' fontWeight='bold'>
            Task Manager
          </Typography>
        </Link>
      </div>
      <div className={styles.menu}>
        <nav>
          <ul>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <Typography variant='subtitle1'>Dashboard</Typography>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/boards'
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <Typography variant='subtitle1'>Boards</Typography>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/teams'
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <Typography variant='subtitle1'>Teams</Typography>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.user}>
        <div className={styles.user_content}>
          <Avatar
            src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            alt='John Doe'
          />
          <div className={styles.user_info}>
            <Typography variant='body1'>John Doe</Typography>
            <IconButton className={styles.user_menu_btn} onClick={handleOpen}>
              <ExpandMore />
            </IconButton>
          </div>
        </div>
        <Box
          className={`${styles.user_menu} ${
            isOpen ? styles.active : undefined
          }`}
        >
          <MenuList sx={{ width: '100%' }}>
            <MenuItem>
              <ListItemIcon>
                <AccountCircleOutlined fontSize='small' />
              </ListItemIcon>
              <ListItemText>Account</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </div>
    </header>
  )
}

export default Header
