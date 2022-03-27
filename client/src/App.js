import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Sidebar from './components/sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='page'>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
