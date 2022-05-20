import React, { useState } from 'react'
import styles from './Task.module.css'
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from '@mui/material'
import {
  MoreVert,
  PersonAddAlt,
  EditOutlined,
  DeleteOutline,
  ChangeCircleOutlined,
  KeyboardArrowRight,
} from '@mui/icons-material'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Box } from '@mui/system'

const Task = ({ task }) => {
  const { user } = useSelector((state) => state.users)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <div className={styles.task_container}>
        <div className={styles.task_header}>
          <Typography variant='h6'>{task.name}</Typography>
          <IconButton size='small' onClick={handleOpenMenu}>
            <MoreVert className={styles.icon} />
          </IconButton>
        </div>
        <div className={styles.task_content}>
          <Typography>{task.desc}</Typography>
        </div>
        <div className={styles.task_footer}>
          <Typography variant='caption'>
            {moment(task.createdAt).fromNow()}
          </Typography>
          {task.user.image ? (
            <Avatar src={task.user.image} className={styles.avatar} />
          ) : (
            <Avatar
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
              }}
              className={styles.avatar}
            >
              {task.user.name.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id='task-menu'
        open={open}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ width: 220, maxWidth: '100%' }}>
          <MenuItem>
            <ListItemIcon>
              <EditOutlined fontSize='small' />
            </ListItemIcon>
            <ListItemText>Edit task</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ChangeCircleOutlined fontSize='small' />
            </ListItemIcon>
            <ListItemText>Change status</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <PersonAddAlt fontSize='small' />
            </ListItemIcon>
            <ListItemText>Change user</ListItemText>
            <Typography variant='body2' color='text.secondary'>
              <KeyboardArrowRight />
            </Typography>
          </MenuItem>
          {task.createdBy === user.id && (
            <MenuItem>
              <ListItemIcon>
                <DeleteOutline fontSize='small' color='error' />
              </ListItemIcon>
              <ListItemText>Delete task</ListItemText>
            </MenuItem>
          )}
        </Box>
      </Menu>
    </>
  )
}

export default Task
