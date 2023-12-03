import React from 'react';
import { Button, Card } from 'react-bootstrap';
import styles from "../../styles/PageLogged.module.css";

interface SportsCardProps {
  sportTitle: string,
  sportImg: string,
  sportText: string,
  sportBtn: () => void,
}

const SportsCard = ({ sportTitle, sportImg, sportText, sportBtn }:SportsCardProps) => {
  return (
    <Card className={styles.sportsCard}>
      <Card.Img variant="top" src={sportImg} />
      <Card.Body>
        <Card.Title>{sportTitle}</Card.Title>
        <Card.Text>
          {sportText}
        </Card.Text>
        <Button onClick={sportBtn} variant="primary">Go play {sportTitle}</Button>
      </Card.Body>
    </Card>
  )
}

export default SportsCard
