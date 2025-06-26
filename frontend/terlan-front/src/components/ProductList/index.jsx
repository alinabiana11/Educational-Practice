import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3333/products/all")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Ошибка загрузки товаров:", err));
  }, []);

  return (
    <div className={styles.grid}>
      {products.map(product => (
        <div className={styles.card} key={product.id}>
          <img
            src={`http://localhost:3333/${product.image}`}
            alt={product.title}
            className={styles.img}
          />
          <h3 className={styles.title}>{product.title}</h3>
          <div className={styles.prices}>
            {product.discont_price
              ? <>
                  <span className={styles.discont}>{product.discont_price}₽</span>
                  <span className={styles.priceOld}>{product.price}₽</span>
                </>
              : <span className={styles.price}>{product.price}₽</span>
            }
          </div>
          <button className={styles.cartBtn}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}
