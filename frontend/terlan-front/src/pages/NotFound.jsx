import React from "react";
import { useNavigate } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import cactus from "../assets/cactus.png"; // или актуальное имя png

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 0" }}>
      <div style={{
        background: "#fff",
        borderRadius: 14,
        padding: "36px 32px",
        textAlign: "center",
        marginBottom: 44,
      }}>
        <div style={{
          fontSize: 110, fontWeight: 700,
          display: "flex", justifyContent: "center", alignItems: "center", gap: 30,
        }}>
          <span style={{ color: "#16a34a" }}>4</span>
          <img
            src={cactus}
            alt="404 cactus"
            style={{ height: 110, width: 110, objectFit: "contain" }}
          />
          <span style={{ color: "#16a34a" }}>4</span>
        </div>
        <div style={{
          fontWeight: 700, fontSize: 32, margin: "36px 0 12px 0"
        }}>
          Page Not Found
        </div>
        <div style={{ color: "#666", fontSize: 18, marginBottom: 30 }}>
          We're sorry, the page you requested could not be found.<br />
          Please go back to the homepage.
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "var(--green)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 44px",
            fontWeight: 600,
            fontSize: 18,
            cursor: "pointer"
          }}
        >
          Go Home
        </button>
      </div>
      <ContactSection />
    </div>
  );
}
