import styles from './styles.module.css';

import heroImg from '../../assets/hero.jpg';

import { useNavigate } from "react-router-dom";



export default function HeroSection() {
    const navigate = useNavigate();

    return (

        <section className={styles.hero}>
            <img
                src={heroImg}
                alt="Gardening"
                className={styles.heroImg}
            />

            <div className={styles.overlay}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Amazing Discounts <br /> on Garden Products!
                    </h1>
                    <button className={styles.heroBtn} onClick={() => navigate('/sales')}>
                        Check out
                    </button>
                </div>
            </div>

        </section>
    );
}
