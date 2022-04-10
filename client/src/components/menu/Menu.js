import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import React from 'react'

const Menu = ({ actions, handleClose, handleOpen, open, handleItemClick }) => {
  return (
    <SpeedDial
      ariaLabel='Add new menu'
      sx={{ position: 'absolute', bottom: 20, right: 20 }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleItemClick}
        />
      ))}
    </SpeedDial>
  )
}

export default Menu
