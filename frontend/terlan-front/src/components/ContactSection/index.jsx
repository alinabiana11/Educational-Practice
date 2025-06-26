import styles from './styles.module.css';
import instagram from '../../assets/instagram.png';
import whatsapp from '../../assets/whatsapp.png';

export default function ContactSection() {
  return (
    <section className={styles.section}>
      <h2>Contact</h2>
      <div className={styles.grid}>
        <div className={styles.box}>
          <div className={styles.label}>Phone</div>
          <div className={styles.value}>+7 (499) 350-66-04</div>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>Socials</div>
          <div className={styles.socials}>
            <a href='https://www.instagram.com/terlan'> <img src={instagram} alt="Instagram"  className={styles.icon} /> </a>
           <a href='https://wa.me/+7(499)350-66-04'> <img src={whatsapp} alt="WhatsApp" className={styles.icon} /></a>
          </div>
        </div>
        <div className={`${styles.box} ${styles.full}`}>
          <div className={styles.label}>Address</div>
          <div className={styles.value}>
            Dubininskaya Ulitsa, 96, Moscow, Russia, 115093
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.label}>Working Hours</div>
          <div className={styles.value}>24 hours a day</div>
        </div>
      </div>
      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps?q=Dubininskaya+Ulitsa,+96,+Moscow,+Russia,+115093&output=embed"
          width="100%"
          height="230"
          style={{ border: 0, borderRadius: '14px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="map"
        ></iframe>
      </div>
    </section>
  );
}
