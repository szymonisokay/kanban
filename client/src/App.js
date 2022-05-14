import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import Boards from './pages/boards/Boards'
import Teams from './components/teams/Teams'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SingleBoard from './components/board/SingleBoard'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ProtectedRoute from './utils/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddBoard from './pages/addBoard/AddBoard'
import Footer from './components/footer/Footer'

function App() {
  return (
    <div className='page'>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/boards'
            element={
              <ProtectedRoute>
                <Boards />
              </ProtectedRoute>
            }
          />
          <Route
            path='/boards/:id'
            element={
              <ProtectedRoute>
                <SingleBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/teams'
            element={
              <ProtectedRoute>
                <Teams />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-board'
            element={
              <ProtectedRoute>
                <AddBoard />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
