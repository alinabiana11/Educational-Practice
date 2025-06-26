import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3333/products/all")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Ошибка загрузки товаров:", err));
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 0' }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 24px 0" }}>All products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
        {products.map(product => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              width: "200px",
              minWidth: "180px",
              textDecoration: "none",
              color: "#222",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              cursor: "pointer",
            }}
          >
            <img
              src={`http://localhost:3333/${product.image}`}
              alt={product.title}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "8px"
              }}
            />
            <div style={{ fontWeight: 600, marginBottom: 5, minHeight: 36 }}>
              {product.title}
            </div>
            <div>
              {product.discont_price ? (
                <>
                  <span style={{ color: "green", fontWeight: 700, marginRight: 8 }}>
                    {product.discont_price}₽
                  </span>
                  <span style={{ color: "#888", textDecoration: "line-through" }}>
                    {product.price}₽
                  </span>
                </>
              ) : (
                <span style={{ fontWeight: 700 }}>{product.price}₽</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
