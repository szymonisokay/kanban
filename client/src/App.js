import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Sidebar from './components/sidebar/Sidebar'
import Boards from './pages/boards/Boards'
import Teams from './components/teams/Teams'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SingleBoard from './components/board/SingleBoard'

function App() {
  return (
    <div className='page'>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/boards' element={<Boards />} />
          <Route path='/boards/:id' element={<SingleBoard />} />
          <Route path='/teams' element={<Teams />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
