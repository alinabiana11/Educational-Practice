import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";

export default function CategoriesAll() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3333/categories/all")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Ошибка загрузки категорий:", err));
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 0' }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 24px 0" }}>Categories</h2>
      <div style={{ display: "flex", gap: "18px", marginBottom: "40px" }}>
        {categories.map(cat => (
          <Link
            to={`/category/${cat.id}`}
            key={cat.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              width: "160px",
              minWidth: "140px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              overflow: "hidden",
              textDecoration: "none",
              color: "#222",
              display: "block"
            }}
          >
            <img
              src={`http://localhost:3333/${cat.image}`}
              alt={cat.title}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                display: "block"
              }}
            />
            <span style={{ display: "block", padding: "10px 0", color: "#222", fontWeight: 500 }}>
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
      <ContactSection />
    </div>
  );
}
