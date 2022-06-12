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
import {
  deleteBoard,
  updateBoard,
} from '../../features/boards/boardAsyncActions'
import ConfirmationModal from '../modals/ConfirmationModal'
import BoardModal from '../modals/BoardModal'
import ShowUsersModal from '../modals/ShowUsersModal'

const Board = ({ board }) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)
  const [isUserModal, setIsUserModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const { user } = useSelector((state) => state.users)

  const usersToShow = board.users?.slice(0, 1)
  const usersRest = board.users?.slice(1)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)

  const handleMenuClose = () => setAnchorEl(null)

  const navigateToBoard = () => navigate(`/boards/${board._id}`)

  const onButtonClick = (type) => {
    if (type === 'edit') {
      setIsEditModal(true)
    } else if (type === 'user') {
      setIsUserModal(true)
    } else {
      setIsDeleteModal(true)
    }

    setAnchorEl(null)
  }

  const onDeleteBoard = () => {
    dispatch(deleteBoard(board._id))
    setIsDeleteModal(false)
  }

  const onEditBoard = (boardData) =>
    dispatch(updateBoard({ id: board._id, boardData }))

  const onModalClose = () => {
    setIsDeleteModal(false)
    setIsEditModal(false)
    setIsUserModal(false)
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
                <Link to={`/boards/${board._id}`}>{board.name}</Link>
              </Typography>
            }
          />
          <CardContent style={{ padding: '0 16px' }}>
            <Typography variant='body2' color='gray'>
              {board.desc}
            </Typography>
          </CardContent>
          <CardActions className={styles.board__footer}>
            <div className={styles.date}>
              <Typography variant='subtitle2' color='text.secondary'>
                {moment(board.createdAt).format('DD MMM YYYY')}
              </Typography>
            </div>
            <div className={styles.users} onClick={() => onButtonClick('user')}>
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
          <MenuItem onClick={() => onButtonClick('edit')}>
            <ListItemIcon>
              <EditOutlined fontSize='small' />
            </ListItemIcon>
            <ListItemText>Edit board</ListItemText>
          </MenuItem>
          {user.id === board.createdBy && (
            <MenuItem onClick={() => onButtonClick('delete')}>
              <ListItemIcon>
                <DeleteOutline fontSize='small' color='error' />
              </ListItemIcon>
              <ListItemText>Delete board</ListItemText>
            </MenuItem>
          )}
        </Box>
      </Menu>

      {/* Confirmation Modal */}
      {isDeleteModal && (
        <ConfirmationModal
          error
          title='Are you sure you want to continue?'
          buttonText='Delete'
          onClose={onModalClose}
          onConfirm={onDeleteBoard}
        />
      )}

      {/* Edit Modal */}
      {isEditModal && (
        <BoardModal
          onClose={onModalClose}
          onConfirm={onEditBoard}
          board={board}
        />
      )}

      {/* Users Modal */}
      {isUserModal && (
        <ShowUsersModal users={board.users} onClose={onModalClose} />
      )}
    </>
  )
}

export default Board
