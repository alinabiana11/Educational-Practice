import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, changeCount, clearCart } from "../store/cartSlice";
import ContactSection from "../components/ContactSection";
import axios from "axios";

export default function CartPage() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [success, setSuccess] = useState(false);

  // Итоги
  const items = cart.reduce((sum, p) => sum + p.count, 0);
  const total = cart.reduce((sum, p) =>
    sum + (p.discont_price ?? p.price) * p.count, 0);

  // Отправка заказа
  const sendOrder = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3333/order/send", {
        products: cart.map(p => ({ id: p.id, count: p.count })),
        name: form.name,
        phone: form.phone,
        email: form.email
      });
      setSuccess(true);
      dispatch(clearCart());
    } catch (err) {
      alert("Error sending order");
    }
  };

  // Обработка количества товара
  const handleCount = (id, n) => {
    const product = cart.find(p => p.id === id);
    if (!product) return;
    dispatch(changeCount({ id, count: Math.max(1, product.count + n) }));
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 0" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>Shopping cart</h2>
      {success && (
        <div style={{
          position: "fixed", top: 120, left: "50%", transform: "translateX(-50%)",
          background: "#22c55e", color: "#fff", padding: "28px 40px", borderRadius: 12,
          fontWeight: 700, fontSize: 24, zIndex: 20
        }}>
          Congratulations!<br />
          Your order has been successfully placed!
          <button
            style={{
              position: "absolute", top: 14, right: 18, fontSize: 18,
              background: "none", color: "#fff", border: "none", cursor: "pointer"
            }}
            onClick={() => setSuccess(false)}
          >✕</button>
        </div>
      )}
      {cart.length === 0 ? (
        <div>
          <p>Looks like you have no items in your basket currently.</p>
          <button
            style={{
              background: "var(--green)", color: "#fff", border: "none",
              padding: "12px 40px", borderRadius: 8, fontWeight: 600, fontSize: 18
            }}
            onClick={() => window.location.href = "/products/all"}
          >Continue Shopping</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 28 }}>
          {/* Товары в корзине */}
          <div style={{ flex: 2 }}>
            {cart.map(p => (
              <div key={p.id} style={{
                background: "#fff", borderRadius: 12, padding: 18,
                display: "flex", alignItems: "center", marginBottom: 15
              }}>
                <img
                  src={`http://localhost:3333${p.image}`}
                  alt={p.title}
                  style={{ width: 80, height: 70, objectFit: "cover", borderRadius: 7, marginRight: 18 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => handleCount(p.id, -1)}
                      style={{
                        width: 30, height: 30, border: "1px solid #ddd",
                        borderRadius: 6, background: "#f1f3f4", fontSize: 18
                      }}>-</button>
                    <span style={{ fontWeight: 700 }}>{p.count}</span>
                    <button onClick={() => handleCount(p.id, 1)}
                      style={{
                        width: 30, height: 30, border: "1px solid #ddd",
                        borderRadius: 6, background: "#f1f3f4", fontSize: 18
                      }}>+</button>
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, marginRight: 24 }}>
                  {(p.discont_price ?? p.price) * p.count}₽
                  {p.discont_price &&
                    <span style={{
                      color: "#888", textDecoration: "line-through",
                      fontWeight: 400, marginLeft: 10, fontSize: 15
                    }}>
                      {p.price * p.count}₽
                    </span>}
                </div>
                <button onClick={() => dispatch(removeFromCart(p.id))}
                  style={{
                    background: "none", border: "none", color: "#444",
                    fontSize: 24, marginLeft: 10, cursor: "pointer"
                  }}>×</button>
              </div>
            ))}
          </div>
          {/* Итоги и форма */}
          <div style={{
            flex: 1, background: "#f1f3f4", borderRadius: 12,
            padding: "24px 26px", height: "fit-content"
          }}>
            <div style={{ fontWeight: 600, fontSize: 19, marginBottom: 10 }}>Order details</div>
            <div style={{ marginBottom: 4 }}>{items} items</div>
            <div style={{ fontWeight: 700, fontSize: 32, marginBottom: 18 }}>
              Total <span style={{ color: "#22c55e" }}>{total.toLocaleString()}</span>₽
            </div>
            <form onSubmit={sendOrder} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="text" placeholder="Name" required
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={{
                  border: "1px solid #ccc", borderRadius: 6, padding: 8,
                  fontSize: 16, marginBottom: 5
                }}
              />
              <input
                type="text" placeholder="Phone number" required
                value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                style={{
                  border: "1px solid #ccc", borderRadius: 6, padding: 8,
                  fontSize: 16, marginBottom: 5
                }}
              />
              <input
                type="email" placeholder="Email" required
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={{
                  border: "1px solid #ccc", borderRadius: 6, padding: 8,
                  fontSize: 16, marginBottom: 10
                }}
              />
              <button
                type="submit"
                style={{
                  background: "var(--green)", color: "#fff", border: "none",
                  borderRadius: 8, padding: "12px 0", fontWeight: 700, fontSize: 17,
                  cursor: "pointer"
                }}
                disabled={cart.length === 0}
              >Order</button>
            </form>
          </div>
        </div>
      )}
      <ContactSection />
    </div>
  );
}
