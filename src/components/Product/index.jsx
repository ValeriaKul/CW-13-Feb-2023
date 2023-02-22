import React from 'react'
import s from './style.module.css';

export default function Product({id, title, description, price, images, imageIndex, deleteProduct, addToBasket, changePhoto}) {
  return (
    <div className={s.card}>
        <img src={images[imageIndex % images.length]} alt={title} onClick={()=>changePhoto(id)} />
        <div className={s.info}>
          <p>{title}</p>
          <p>{description}</p>
          <div className={s.priceAndBtns}>
            <p>{price} $</p>
            <div className={s.btns}>
              <button onClick={() => deleteProduct(id)}>Удалить</button>
              <button onClick={() => addToBasket(id)}>Добавить</button>
            </div>
          </div>
        </div>
    </div>
  )
}
