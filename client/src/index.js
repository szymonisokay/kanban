import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { store } from './app/store'
import { Provider } from 'react-redux'

import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6c63ff',
      hover: '#554dff',
    },
    secondary: {
      main: '#ffffff',
      hover: '#bab5ff',
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
