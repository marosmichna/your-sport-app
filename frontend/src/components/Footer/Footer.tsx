import React from 'react';
import { Container } from 'react-bootstrap';
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <Container>
            <p>&copy; 2023 Your Sport</p>
        </Container>
    </footer>
  )
}

export default Footer;
