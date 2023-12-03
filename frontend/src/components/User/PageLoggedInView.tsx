import React from 'react';
import { Col, Container, Row} from 'react-bootstrap';
 
import { useNavigate } from 'react-router-dom';
import SportsCard from '../Sports/SportsCard';
import TennisImage from "../../images/sports/Tennis.png";
import FootballImage from "../../images/sports/Football.png";
import HockeyImage from "../../images/sports/Hockey.png";
import BasketballImage from "../../images/sports/Basketball.png";

const PageLoggedInView = () => {


  const navigate = useNavigate();

  const handleTennisClick = () => {
    navigate(`/tennis`);
  };

  return (
    <>
        <Container>
          <Row>
            <Col>
              <SportsCard 
                sportTitle='Tennis'
                sportImg={TennisImage}
                sportText='Tennis play'
                sportBtn={handleTennisClick}
              />
            </Col>
            <Col>
              <SportsCard 
                sportTitle='Football'
                sportImg={FootballImage}
                sportText='It is being prepared'
                sportBtn={() => {}}
              />
            </Col>
            <Col>
              <SportsCard 
                sportTitle='Hockey'
                sportImg={HockeyImage}
                sportText='It is being prepared'
                sportBtn={() => {}}
              />
            </Col>
            <Col>
              <SportsCard 
                sportTitle='Basketball'
                sportImg={BasketballImage}
                sportText='It is being prepared'
                sportBtn={() => {}}
              />
            </Col>
          </Row>
        </Container>
    </>
  )
}

export default PageLoggedInView;
