import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart.png"; 
import styles from "./styles.module.css";

export default function Header() {
    const cart = useSelector(state => state.cart.items);
    const cartCount = cart.reduce((sum, p) => sum + p.count, 0);

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                {/* Лого */}
                <Link to="/" className={styles.logoWrap}>
                    <img src={logo} alt="logo" className={styles.logoImg} />
                </Link>

                {/* Меню */}
                <nav className={styles.menu}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? styles.active : undefined
                        }
                        end
                    >
                        Main Page
                    </NavLink>
                    <NavLink
                        to="/categories/all"
                        className={({ isActive }) =>
                            isActive ? styles.active : undefined
                        }
                    >
                        Categories
                    </NavLink>
                    <NavLink
                        to="/products/all"
                        className={({ isActive }) =>
                            isActive ? styles.active : undefined
                        }
                    >
                        All products
                    </NavLink>
                    <NavLink
                        to="/sales"
                        className={({ isActive }) =>
                            isActive ? styles.active : undefined
                        }
                    >
                        All sales
                    </NavLink>
                </nav>

                {/* Корзина */}
                <div className={styles.cartWrap}>
                    <Link to="/cart" className={styles.cartLink}>
                        <img src={cartIcon} alt="cart" className={styles.cartImg} />
                        {cartCount > 0 && (
                            <span className={styles.cartBadge}>{cartCount}</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
