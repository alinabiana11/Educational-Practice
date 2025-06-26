import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
// const navigate = useNavigate();
export default function CategoriesSection() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3333/categories/all")
            .then(res => setCategories(res.data))
            .catch(err => console.error('Ошибка загрузки категорий:', err));
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Categories</h2>
                <div className={styles.divider}></div>
                <button className={styles.allBtn} onClick={() => navigate('/categories/all')}>
                    All categories
                </button>
            </div>

            <div className={styles.grid}>
                {categories.slice(0, 4).map(cat => (
                    <Link to={`/category/${cat.id}`} className={styles.catCard} key={cat.id}>
                        <img src={`http://localhost:3333/${cat.image}`} alt={cat.title} />
                        <span>{cat.title}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
