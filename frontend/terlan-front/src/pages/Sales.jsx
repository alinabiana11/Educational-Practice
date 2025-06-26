import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import axios from "axios";

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("default");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3333/products/all")
      .then(res => setProducts(res.data.filter(p => p.discont_price)))
      .catch(err => console.error("Ошибка загрузки товаров:", err));
  }, []);

  // Фильтрация по цене
  let filtered = products.filter(p => {
    let inRange = true;
    if (priceFrom) inRange = (p.discont_price ?? p.price) >= Number(priceFrom);
    if (inRange && priceTo) inRange = (p.discont_price ?? p.price) <= Number(priceTo);
    return inRange;
  });

  // Сортировка
  if (sort === "newest") filtered = [...filtered].reverse();
  if (sort === "high-low") filtered = [...filtered].sort((a, b) => (b.discont_price || b.price) - (a.discont_price || a.price));
  if (sort === "low-high") filtered = [...filtered].sort((a, b) => (a.discont_price || a.price) - (b.discont_price || b.price));

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 0' }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 24px 0" }}>Discounted items</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
        <div>
          <label>Price</label>
          <input
            type="number"
            placeholder="from"
            value={priceFrom}
            onChange={e => setPriceFrom(e.target.value)}
            style={{ width: 65, margin: "0 8px" }}
          />
          <input
            type="number"
            placeholder="to"
            value={priceTo}
            onChange={e => setPriceTo(e.target.value)}
            style={{ width: 65 }}
          />
        </div>
        <div>
          <label>Sorted </label>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ marginLeft: 8, padding: 3 }}
          >
            <option value="default">by default</option>
            <option value="newest">newest</option>
            <option value="high-low">price: high-low</option>
            <option value="low-high">price: low-high</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", marginBottom: "40px" }}>
        {filtered.map(product => (
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
              position: "relative"
            }}
          >
            <span style={{
              position: "absolute", top: 12, right: 12,
              background: "var(--green)", color: "#fff", padding: "2px 10px",
              fontSize: 14, borderRadius: 7, fontWeight: 600
            }}>
              {Math.round(100 - (product.discont_price / product.price * 100))}%
            </span>
            <img
              src={`http://localhost:3333${product.image}`}
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
              <span style={{ color: "green", fontWeight: 700, marginRight: 8 }}>
                {product.discont_price}₽
              </span>
              <span style={{ color: "#888", textDecoration: "line-through" }}>
                {product.price}₽
              </span>
            </div>
          </Link>
        ))}
      </div>
      <ContactSection />
    </div>
  );
}
