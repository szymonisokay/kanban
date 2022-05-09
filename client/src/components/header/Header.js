import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
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

import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../features/users/userSlice'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const logout = () => {
    dispatch(logoutUser())
    navigate('/login')
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
                to='/add-board'
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <Typography variant='subtitle1'>Add board</Typography>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to='/teams'
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <Typography variant='subtitle1'>Teams</Typography>
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
      {user ? (
        <div className={styles.user}>
          <div className={styles.user_content} onClick={handleOpen}>
            {user.image ? (
              <Avatar src={user.image} alt={user.name} />
            ) : (
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                {' '}
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <div className={styles.user_info}>
              <Typography variant='body1'>{user.name}</Typography>
              <IconButton
                className={`${styles.user_menu_btn} ${
                  isOpen ? styles.active : undefined
                }`}
              >
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
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                <ListItemText>Log out</ListItemText>
              </MenuItem>
            </MenuList>
          </Box>
        </div>
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </header>
  )
}

export default Header
