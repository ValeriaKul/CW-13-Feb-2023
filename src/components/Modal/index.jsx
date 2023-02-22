import React from 'react'
import s from './style.module.css';

export default function Modal({children, closeWindow}) {
  return (
    <div className={s.container}>
        <div className={s.window}>
        <button onClick={closeWindow}>Close</button>
            {children}
        </div>
        
    </div>
  )
}
