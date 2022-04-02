import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Sidebar from './components/sidebar/Sidebar'
import Boards from './components/board/Boards'
import Teams from './components/teams/Teams'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='page'>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/boards' element={<Boards />} />
          <Route path='/teams' element={<Teams />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
