import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addBoard } from '../../features/boards/boardSlice'
import styles from './Modal.module.css'

const Modal = ({ method, title, onCloseModal }) => {
  const nameInputRef = useRef()
  const descInputRef = useRef()

  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()

    const name = nameInputRef.current.value
    const desc = descInputRef.current.value

    if (!name) {
      return
    }

    dispatch(addBoard({ name, desc }))
  }

  return (
    <>
      <div className={styles.overlay} onClick={() => onCloseModal()} />
      <div className={styles.modal}>
        <h3>{method === 'edit' ? `Edit ${title}` : `Add new ${title}`}</h3>
        <form onSubmit={onFormSubmit}>
          <div className={styles.form_control}>
            <input id='name' name='name' ref={nameInputRef} />
            <label htmlFor='name'>Name</label>
          </div>
          <div className={styles.form_control}>
            <textarea
              rows={4}
              maxLength='100'
              id='desc'
              name='desc'
              ref={descInputRef}
            />
            <label htmlFor='desc'>Description</label>
          </div>

          <button>{method === 'edit' ? 'Edit' : 'Add'}</button>
        </form>
      </div>
    </>
  )
}

export default Modal
