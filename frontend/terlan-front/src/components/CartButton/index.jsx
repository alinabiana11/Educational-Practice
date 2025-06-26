import React from "react";
import styles from "./styles.module.css";

export default function CartButton({ added, onClick }) {
  return (
    <button
      className={added ? styles.added : styles.green}
      disabled={added}
      onClick={onClick}
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
