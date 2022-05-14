import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to='/'>Task Manager</Link>
        <span>&copy; {new Date().getFullYear()} | Szymon Wałach</span>
      </div>
    </footer>
  )
}

export default Footer
