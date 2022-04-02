import React from 'react'
import styles from './Breadcrumb.module.css'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumb = () => {
  const location = useLocation()

  return (
    <div className={styles.breadcrumb__box}>
      <Link to='/'>Dashboard</Link>
      {location.pathname !== '/' && (
        <>
          <span className={styles.divider}>/</span>
          <Link className={styles.active} to={location.pathname}>
            {location.pathname.replace('/', '').charAt(0).toUpperCase() +
              location.pathname.slice(2)}
          </Link>
        </>
      )}
    </div>
  )
}

export default Breadcrumb
