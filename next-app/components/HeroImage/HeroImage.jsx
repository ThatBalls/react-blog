import { Row, Col, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import styles from './Hero.module.css'

function HeroImage({coverImg, title, subtitle}) {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroImg} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${coverImg}")`}}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            {title}
          </h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
    </div>
  );
}

export default HeroImage;
