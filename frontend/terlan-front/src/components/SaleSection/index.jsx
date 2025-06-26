import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

export default function SaleSection() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3333/products/all")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Ошибка загрузки товаров:", err));
  }, []);

  // Только товары со скидкой
  const discounted = products.filter(p => p.discont_price);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sale</h2>
        <div className={styles.divider}></div>
        <button
          className={styles.allBtn}
          onClick={() => navigate('/products/all')}
        >
          All products
        </button>
      </div>
      <div className={styles.grid}>
        {discounted.slice(0, 4).map(product => (
          <Link to={`/products/${product.id}`} className={styles.card} key={product.id}>
            <div className={styles.imgWrap}>
              <img
                src={`http://localhost:3333/${product.image}`}
                alt={product.title}
                className={styles.img}
              />
              <span className={styles.discount}>
                {Math.round(100 - (product.discont_price / product.price * 100))}%
              </span>
            </div>
            <div className={styles.prodTitle}>{product.title}</div>
            <div className={styles.prices}>
              <span className={styles.priceNew}>{product.discont_price}₽</span>
              <span className={styles.priceOld}>{product.price}₽</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
