import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import ContactSection from "../components/ContactSection";
import CartButton from "../components/CartButton";
import NotFound from "./NotFound";
import axios from "axios";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(undefined); // undefined=loading, null/{}=not found
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isAdded = cartItems.some(item => item.id === Number(id));

 useEffect(() => {
  axios.get(`http://localhost:3333/products/${id}`)
    .then(res => {
      if (res.data.status === "ERR") {
        setProduct(null);
      } else if (Array.isArray(res.data)) {
        setProduct(res.data[0]);
      } else {
        setProduct(res.data);
      }
    })
    .catch(() => setProduct(null));
}, [id]);


  if (product === undefined) return <div>Loading...</div>;
  if (!product) return <NotFound />;

  const discountPercent = product.discont_price
    ? Math.round(100 - (product.discont_price / product.price) * 100)
    : null;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 0" }}>
      <div style={{
        display: "flex",
        gap: 48,
        alignItems: "flex-start",
        background: "#fff",
        borderRadius: 14,
        padding: "36px 32px",
        marginBottom: 44
      }}>
        <img
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
          style={{
            width: 350,
            height: 270,
            objectFit: "contain",
            borderRadius: 14,
            background: "#f1f3f4"
          }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "2rem", margin: 0, fontWeight: 700 }}>{product.title}</h2>
          <div style={{ display: "flex", alignItems: "center", margin: "22px 0" }}>
            <span style={{ fontWeight: 700, fontSize: "1.5rem", color: "#222" }}>
              {product.discont_price ?? product.price}₽
            </span>
            {product.discont_price && (
              <>
                <span style={{
                  color: "#8b8b8b",
                  fontSize: "1.2rem",
                  textDecoration: "line-through",
                  marginLeft: 12,
                  marginRight: 12
                }}>
                  {product.price}₽
                </span>
                <span style={{
                  background: "var(--green)",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 7,
                  fontSize: 16,
                  padding: "2px 12px"
                }}>
                  {discountPercent}%
                </span>
              </>
            )}
          </div>
          {/* Количество */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <button
              onClick={() => setCount(c => Math.max(1, c - 1))}
              style={{
                width: 36, height: 36, borderRadius: 8, border: "1px solid #ddd",
                background: "#f1f3f4", fontSize: 24, cursor: "pointer", marginRight: 8
              }}
            >-</button>
            <span style={{ fontSize: 20, fontWeight: 600, width: 40, textAlign: "center" }}>{count}</span>
            <button
              onClick={() => setCount(c => c + 1)}
              style={{
                width: 36, height: 36, borderRadius: 8, border: "1px solid #ddd",
                background: "#f1f3f4", fontSize: 24, cursor: "pointer", marginLeft: 8
              }}
            >+</button>
            <div style={{ marginLeft: 22, minWidth: 160 }}>
              <CartButton
                added={isAdded}
                onClick={() => {
                  dispatch(addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    discont_price: product.discont_price,
                    image: product.image,
                    count,
                  }));
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 5 }}>Description</div>
            <div style={{ color: "#444", fontSize: 15, lineHeight: 1.5 }}>{product.description}</div>
          </div>
        </div>
      </div>
      <ContactSection />
    </div>
  );
}
