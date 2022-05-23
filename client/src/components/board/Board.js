import React, { useState } from 'react'
import styles from './Board.module.css'
import { Link, useNavigate } from 'react-router-dom'

import { MoreVert } from '@mui/icons-material'

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  Typography,
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'

import { EditOutlined, DeleteOutline, ArrowForward } from '@mui/icons-material'

import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBoard } from '../../features/boards/boardSlice'
import ConfirmationModal from '../modals/ConfirmationModal'

const Board = ({ _id, name, desc, users, createdAt, createdBy }) => {
  const [isModal, setIsModal] = useState(false)
  const [deletedBoard, setDeletedBoard] = useState(null)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const { user } = useSelector((state) => state.users)

  const usersToShow = users?.slice(0, 2)
  const usersRest = users?.slice(2)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const navigateToBoard = () => {
    navigate(`/boards/${_id}`)
  }

  const onButtonClick = () => {
    setDeletedBoard(_id)
    setIsModal(true)
    setAnchorEl(null)
  }

  const onDeleteBoard = () => {
    dispatch(deleteBoard(deletedBoard))
    setIsModal(false)
  }

  const onModalClose = () => {
    setIsModal(false)
  }

  return (
    <>
      <div className={styles.board}>
        <Card>
          <CardHeader
            action={
              <IconButton onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
            }
            title={
              <Typography variant='body1'>
                <Link to={`/boards/${_id}`}>{name}</Link>
              </Typography>
            }
          />
          <CardContent style={{ padding: '0 16px' }}>
            <Typography variant='body2' color='gray'>
              {desc}
            </Typography>
          </CardContent>
          <CardActions className={styles.board__footer}>
            <div className={styles.date}>
              <Typography variant='subtitle2' color='text.secondary'>
                {moment(createdAt).format('DD MMM YYYY')}
              </Typography>
            </div>
            <div className={styles.users}>
              {usersToShow.map((user) =>
                user.image ? (
                  <img
                    key={user._id}
                    src={user.image}
                    alt={user.name}
                    style={{
                      background: (theme) => theme.palette.primary.main,
                    }}
                  />
                ) : (
                  <Avatar
                    key={user._id}
                    className={styles.user_avatar}
                    title={user.name}
                    sx={{ background: (theme) => theme.palette.primary.main }}
                  >
                    {user?.name.charAt(0).toUpperCase()}
                  </Avatar>
                )
              )}
              {usersRest.length > 0 && <span>+{usersRest.length}</span>}
            </div>
          </CardActions>
        </Card>
      </div>

      {/* Menu */}
      <Menu
        id='board-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ width: 220, maxWidth: '100%' }}>
          <MenuItem onClick={navigateToBoard}>
            <ListItemIcon>
              <ArrowForward fontSize='small' />
            </ListItemIcon>
            <ListItemText>Go to board</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <EditOutlined fontSize='small' />
            </ListItemIcon>
            <ListItemText>Edit board</ListItemText>
          </MenuItem>
          {user.id === createdBy && (
            <MenuItem onClick={onButtonClick}>
              <ListItemIcon>
                <DeleteOutline fontSize='small' color='error' />
              </ListItemIcon>
              <ListItemText>Delete board</ListItemText>
            </MenuItem>
          )}
        </Box>
      </Menu>

      {/* Confirmation Modal */}
      {isModal && (
        <ConfirmationModal
          error
          title='Are you sure you want to continue?'
          buttonText='Delete'
          onClose={onModalClose}
          onConfirm={onDeleteBoard}
        />
      )}
    </>
  )
}

export default Board
