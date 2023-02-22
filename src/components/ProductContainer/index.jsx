import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BasketContainer from "../BasketContainer";
import Product from "../Product";
import Modal from "../Modal";
import s from "./style.module.css";

export default function ProductContainer() {
  const [products, setProducts] = useState(null);
  const [basket, setBasket] = useState(
    () => JSON.parse(localStorage.getItem("basket")) ?? []
  );
  const [modal, setModal] = useState(false);
  //* const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) ?? []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    (async () => {
      const resp = await fetch("https://dummyjson.com/products");
      const data = await resp.json();
      const result = data.products.map(
        ({ id, title, price, description, images }) => ({
          id,
          title,
          price,
          description,
          images,
          imageIndex: 0,
        })
      );
      setProducts(result);
    })();
  }, []);

  useEffect(() => {
    if (products === null) {
      return;
    }
    const products_ids = products.map(({ id }) => id);
    setBasket((pre) => pre.filter(({ id }) => products_ids.includes(id)));
  }, [products]);

  const deleteProduct = (delId) =>
    setProducts(products.filter(({ id }) => id !== delId));

  const addToBasket = (value) => {
    const productFromBasket = basket.find(({ id }) => id === value);
    if (productFromBasket) {
      productFromBasket.count++;
      setBasket([...basket]);
    } else {
      const target = products.find(({ id }) => id === value);
      setBasket([...basket, { ...target, count: 1 }]);
    }
  };

  const openWindow = () => setModal(true);
  const closeWindow = () => setModal(false);

  const changePhoto = (value) => {
    products.find(({ id }) => id === value).imageIndex++;
    setProducts([...products]);
  };

  const increment = (value) => {
    const target = basket.find(({ id }) => id === value);
    target.count++;
    setBasket([...basket]);
  };

  const decrement = (value) => {
    const target = basket.find(({ id }) => id === value);
    target.count--;
    if (target.count === 0) {
      setBasket(basket.filter((elem) => elem !== target));
    } else {
      setBasket([...basket]);
    }
  };

  const deleteFromBasket = (value) =>
    setBasket(basket.filter(({ id }) => id !== value));

  const clearBasket = () => setBasket([]);

  return (
    <div>
      <button onClick={openWindow}>
        Открыть корзину ({basket.reduce((pre, { count }) => pre + count, 0)})
      </button>
      {modal ? (
        <Modal
          closeWindow={closeWindow}
        >
          <BasketContainer
            basket={basket}
            increment={increment}
            decrement={decrement}
            clearBasket={clearBasket}
            deleteFromBasket={deleteFromBasket}
          />
        </Modal>
      ) : (
        ""
      )}
      <div className={s.container}>
        {products === null
          ? "Loading"
          : products.map((product) => (
              <Product
                key={product.id}
                {...product}
                deleteProduct={deleteProduct}
                addToBasket={addToBasket}
                changePhoto={changePhoto}
              />
            ))}
      </div>
    </div>
  );
}

// добавить компонент BasketCalculation с рассчетом кол-ва и общей цены
