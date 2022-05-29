import React, { useState, useEffect, useCallback } from 'react'
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
  Button,
  Divider,
} from '@mui/material'
import {
  ExpandMore,
  AccountCircleOutlined,
  Logout,
  Menu,
  Close,
} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../features/users/userSlice'
import jwt_decode from 'jwt-decode'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)
  const { user } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const logout = useCallback(() => {
    setIsOpen(false)
    setIsMenuActive(false)
    dispatch(logoutUser())
    navigate('/login')
  }, [dispatch, navigate])

  const onLogin = () => {
    setIsMenuActive(false)
    navigate('/login')
  }

  useEffect(() => {
    const decodeToken = () => {
      if (!user) return

      const { exp } = jwt_decode(user?.token)

      if (Date.now() >= exp * 1000) {
        logout()
        return
      }
    }
    decodeToken()
  }, [logout, user])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to='/'>
            <Typography variant='h6' color='dark' fontWeight='bold'>
              Task Manager
            </Typography>
          </Link>
        </div>
        <Menu
          className={styles.menu_icon}
          onClick={() => setIsMenuActive(!isMenuActive)}
        />

        <div className={styles.menu}>
          <nav className={styles.nav}>
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
          <Button
            variant='contained'
            color='primary'
            onClick={onLogin}
            className={styles.login}
          >
            Login
          </Button>
        )}

        <div
          className={`${styles.mobile_menu} ${
            isMenuActive ? styles.active : undefined
          }`}
        >
          <Close
            className={styles.close}
            onClick={() => setIsMenuActive(false)}
          />
          <Typography variant='h3'>Task Manager</Typography>
          <nav>
            <ul>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                  onClick={() => setIsMenuActive(false)}
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
                  onClick={() => setIsMenuActive(false)}
                >
                  <Typography variant='subtitle1'>Add board</Typography>
                </NavLink>
              </li>
              <Divider />
              <li>
                <Link to='/' onClick={() => setIsMenuActive(false)}>
                  <Typography variant='subtitle1'>Account</Typography>
                </Link>
              </li>
              {user ? (
                <li>
                  <Button variant='contained' onClick={logout}>
                    Log out
                  </Button>
                </li>
              ) : (
                <li>
                  <Button variant='contained' onClick={onLogin}>
                    Login
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
