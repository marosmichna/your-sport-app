import React from 'react';
import { Badge, Button, Card, Carousel, Col, Container, ListGroup, Row } from 'react-bootstrap';
import SportsImg from "../../images/sports/welcomeImg.png";
import styles from "../../styles/PageLogged.module.css";

interface PageLoggedOutViewProps {
  onSignUpClicked: () => void,
  onLoginClicked: () => void,
}

const PageLoggedOutView = ({ onSignUpClicked, onLoginClicked }:PageLoggedOutViewProps ) => {
  return (
    <Container>
      <h1 className="text-center">Welcome to the site <Badge  bg="primary">Your Sport</Badge> </h1>
      <Row className=" mt-4 g-2">
        <Col className="text-center">
          <img className={styles.imageIn} src={SportsImg} alt="Sports Image" />
        </Col>
        <Col className={styles.colstyle}>
        <Card className={styles.cardHeight}>
          <Card.Body>
            <Card.Title>Your Sport</Card.Title>
            <Card.Text>
              The app serves for better processing and work with your team
            </Card.Text>
            <Card.Link href="/about">About App</Card.Link>
          </Card.Body>
          <Card.Body className={styles.btnStyle}>
            <Button onClick={onSignUpClicked}>Sign Up</Button>
            <Button onClick={onLoginClicked}>Log In</Button>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      <Card className={styles.cardColor}>
      <Carousel indicators={false}>
        <Carousel.Item>
            <h5 className='text-center'>
              You don't convert one hundred percent of the shots you don't shoot.
            </h5>
            <p className='text-end'>"Wayne Gretzky"</p>
        </Carousel.Item>
        <Carousel.Item>
            <h5 className='text-center'>    
              I failed and then failed again and again. That's why I succeeded in the end.
            </h5>
            <p className='text-end'>"Michael Jordan"</p>
        </Carousel.Item>
        <Carousel.Item>
            <h5 className='text-center'>
              If you don't believe that you can be the best, then you will never achieve what you are capable of.
            </h5>
            <p className='text-end'>"Cristiano Ronaldo"</p>
        </Carousel.Item>
        <Carousel.Item>
            <h5 className='text-center'>
              What makes winning special is not what you can get, but the feeling that comes when you lose.
            </h5>
            <p className='text-end'>"Andre Agassi"</p>
        </Carousel.Item>
      </Carousel>
      </Card>
      
    </Container>
  )
}

export default PageLoggedOutView;
