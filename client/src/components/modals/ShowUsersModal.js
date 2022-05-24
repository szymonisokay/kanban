import React from 'react'
import styles from './Modals.module.css'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
} from '@mui/material'

const ShowUsersModal = ({ users, onClose }) => {
  return (
    <>
      <div className={styles.modal_overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modal_content_users}>
          <List>
            {users.map((user, index) => (
              <React.Fragment key={index}>
                <ListItem
                  key={user._id}
                  secondaryAction={
                    <Button variant='text' color='primary'>
                      Show
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    {user.image ? (
                      <Avatar alt={user.name} src={user.image} />
                    ) : (
                      <Avatar
                        sx={{
                          background: (theme) => theme.palette.primary.main,
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
                {users.length - 1 > index && <Divider variant='inset' />}
              </React.Fragment>
            ))}
          </List>
        </div>
        <div className={styles.modal_actions}>
          <Button onClick={onClose} variant='text' sx={{ color: 'black' }}>
            Close
          </Button>
        </div>
      </div>
    </>
  )
}

export default ShowUsersModal
