import React, { useState } from 'react'
import styles from './Task.module.css'
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import {
  MoreVert,
  PersonAddAlt,
  EditOutlined,
  DeleteOutline,
  ChangeCircleOutlined,
  KeyboardArrowRight,
  ArrowBack,
  Check,
} from '@mui/icons-material'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from '../modals/ConfirmationModal'
import AddTask from './AddTask'
import { updateTask, deleteTask } from '../../features/boards/boardAsyncActions'

const Task = ({ task, statuses }) => {
  const { user } = useSelector((state) => state.users)
  const {
    boards: { users },
  } = useSelector((state) => state.board)
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false)
  const [isStatusMenuOpened, setIsStatusMenuOpened] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [deletedTask, setDeletedTask] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [editTask, setEditTask] = useState(false)

  const open = Boolean(anchorEl)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    if (isUserMenuOpened) setTimeout(() => setIsUserMenuOpened(false), 200)
    if (isStatusMenuOpened) setTimeout(() => setIsStatusMenuOpened(false), 200)
    setAnchorEl(null)
  }

  const updateUser = async (userId) => {
    const taskData = {
      ...task,
      user: userId,
    }

    dispatch(updateTask({ id: task._id, taskData }))
  }

  const updateStatus = async (statusId) => {
    const taskData = {
      ...task,
      status: statusId,
    }

    dispatch(updateTask({ id: task._id, taskData }))
  }

  const onModalClick = (taskId) => {
    setDeletedTask(taskId)
    setIsModal(true)
  }

  const onModalClose = () => {
    setIsModal(false)
  }

  const onDeleteTask = async () => {
    setAnchorEl(null)
    setIsModal(false)

    dispatch(deleteTask(deletedTask))
  }

  const onButtonClick = (task) => {
    setSelectedTask(task)
    setEditTask(true)
    setAnchorEl(null)
  }

  const onEditTask = async (data) => {
    const taskData = {
      ...selectedTask,
      name: data.name,
      desc: data.desc,
      user: data.user,
    }

    dispatch(updateTask({ id: selectedTask._id, taskData }))
  }

  const onEditTaskClose = () => {
    setEditTask(false)
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
          <Typography variant='body1' color='text.secondary'>
            {task.desc}
          </Typography>
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

      {/* Menu Content */}
      <Menu
        anchorEl={anchorEl}
        id='task-menu'
        open={open}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!isUserMenuOpened && !isStatusMenuOpened && (
          <Box sx={{ width: 220, maxWidth: '100%' }}>
            <MenuItem onClick={() => setIsStatusMenuOpened(true)}>
              <ListItemIcon>
                <ChangeCircleOutlined fontSize='small' />
              </ListItemIcon>
              <ListItemText>Change status</ListItemText>
              <Typography
                sx={{ display: 'flex' }}
                variant='body2'
                color='text.secondary'
              >
                <KeyboardArrowRight />
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => setIsUserMenuOpened(true)}>
              <ListItemIcon>
                <PersonAddAlt fontSize='small' />
              </ListItemIcon>
              <ListItemText>Change user</ListItemText>
              <Typography
                sx={{ display: 'flex' }}
                variant='body2'
                color='text.secondary'
              >
                <KeyboardArrowRight />
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => onButtonClick(task)}>
              <ListItemIcon>
                <EditOutlined fontSize='small' />
              </ListItemIcon>
              <ListItemText>Edit task</ListItemText>
            </MenuItem>
            {task.createdBy === user.id && (
              <MenuItem onClick={() => onModalClick(task._id)}>
                <ListItemIcon>
                  <DeleteOutline fontSize='small' color='error' />
                </ListItemIcon>
                <ListItemText>Delete task</ListItemText>
              </MenuItem>
            )}
          </Box>
        )}
        {isUserMenuOpened && (
          <Box sx={{ width: 220, maxWidth: '100%' }}>
            <MenuItem onClick={() => setIsUserMenuOpened(false)}>
              <ListItemIcon>
                <ArrowBack fontSize='small' />
              </ListItemIcon>
              <ListItemText>Go Back</ListItemText>
            </MenuItem>
            <Divider />
            {users?.map((user) => (
              <MenuItem key={user._id} onClick={() => updateUser(user._id)}>
                {user._id === task.user._id ? (
                  <ListItemIcon>
                    <Check fontSize='small' />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon />
                )}
                <ListItemText>{user.name}</ListItemText>
              </MenuItem>
            ))}
          </Box>
        )}

        {isStatusMenuOpened && (
          <Box sx={{ width: 220, maxWidth: '100%' }}>
            <MenuItem onClick={() => setIsStatusMenuOpened(false)}>
              <ListItemIcon>
                <ArrowBack fontSize='small' />
              </ListItemIcon>
              <ListItemText>Go Back</ListItemText>
            </MenuItem>
            <Divider />
            {statuses?.map((status) => (
              <MenuItem
                key={status._id}
                onClick={() => updateStatus(status._id)}
              >
                {status._id === task.status._id ? (
                  <ListItemIcon>
                    <Check fontSize='small' />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon />
                )}
                <ListItemText>{status.type}</ListItemText>
              </MenuItem>
            ))}
          </Box>
        )}
      </Menu>

      {/* Confirmation Modal */}
      {isModal && (
        <ConfirmationModal
          error
          title='Are you sure you want to continue?'
          buttonText='Delete'
          onClose={onModalClose}
          onConfirm={onDeleteTask}
        />
      )}

      {/* Edit Task */}
      {editTask && (
        <AddTask
          edit
          onClose={onEditTaskClose}
          task={selectedTask}
          setTask={onEditTask}
        />
      )}
    </>
  )
}

export default Task
