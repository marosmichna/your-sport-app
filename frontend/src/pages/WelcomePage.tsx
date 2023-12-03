import React from 'react';
import { Container } from 'react-bootstrap';
import styles from "../styles/TennisTeamPage.module.css";
import { User } from '../models/user';
import PageLoggedInView from '../components/User/PageLoggedInView';
import PageLoggedOutView from '../components/User/PageLoggedOutView';

interface WelcomePageProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const WelcomePage = ({ loggedInUser, onSignUpClicked, onLoginClicked }: WelcomePageProps) => {
  return (
    <Container className={styles.notesPage}>
        <>
          {
            loggedInUser
            ? <PageLoggedInView />
            : <PageLoggedOutView onSignUpClicked={onSignUpClicked} onLoginClicked={onLoginClicked} />
          }
        </>
    </Container>
  )
}

export default WelcomePage;
