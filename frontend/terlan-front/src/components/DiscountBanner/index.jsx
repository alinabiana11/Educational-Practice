import styles from './styles.module.css';
import hands from '../../assets/hands.png';

export default function DiscountBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <img src={hands} alt="Hands with garden tools" className={styles.img} />
      </div>
      <div className={styles.right}>
        <h2 className={styles.title}>5% off on the first order</h2>
        <form className={styles.form}>
          <input className={styles.input} type="text" placeholder="Name" />
          <input className={styles.input} type="text" placeholder="Phone number" />
          <input className={styles.input} type="email" placeholder="Email" />
          <button className={styles.button} type="submit">
            Get a discount
          </button>
        </form>
      </div>
    </section>
  );
}
