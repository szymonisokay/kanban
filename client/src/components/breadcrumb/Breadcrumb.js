import React from 'react'
import styles from './Breadcrumb.module.css'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumb = () => {
  const location = useLocation()
  const routes = location.pathname.split('/').filter((path) => path)
  const pathnames = routes.map((route) =>
    (route.charAt(0).toUpperCase() + route.slice(1)).replace('-', ' ')
  )

  return (
    <div className={styles.breadcrumb__box}>
      {pathnames.length > 0 ? (
        <Link to='/'>Dashboard</Link>
      ) : (
        <span className={styles.disabled}>Dashboard</span>
      )}

      {pathnames.map((path, index) => {
        const route = `/${routes.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1

        return isLast ? (
          <span key={path} className={styles.disabled}>
            {path}
          </span>
        ) : (
          <Link key={path} to={route}>
            {path}
          </Link>
        )
      })}
    </div>
  )
}

export default Breadcrumb
