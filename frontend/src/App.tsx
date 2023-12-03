import React, { useState, useEffect } from "react";
import LoginModal from './components/User/LoginModal';
import NavBar from './components/NavBar/NavBar';
import SignUpModal from './components/User/SignUpModal';
import { User } from "./models/user";
import * as SportApi from "./network/sports_api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./styles/App.module.css";
import WelcomePage from "./pages/WelcomePage";
import TennisTeamDetailPage from "./pages/Tennis/TennisTeamDetailPage";
import TennisTeamsPage from "./pages/Tennis/TennisTeamsPage";
import ProtectedRoutes from "./components/User/ProtectedRoutes";
import Footer from "./components/Footer/Footer";
import AboutPage from "./pages/About";


function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(()=> {
    async function fetchLoggedInUser() {
      try {
        const user = await SportApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        
      }
    }
    fetchLoggedInUser();
  }, [])

  return (
    <BrowserRouter>
      <div>
        <NavBar 
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route path="/" element={<WelcomePage onLoginClicked={() => setShowLoginModal(true)} onSignUpClicked={() => setShowSignUpModal(true)}  loggedInUser={loggedInUser} />} />
            <Route element={<ProtectedRoutes loggedInUser={loggedInUser} />}>
              <Route path="/tennis" element={<TennisTeamsPage />} />
              <Route path="/tennis/:tennisTeamId" element={<TennisTeamDetailPage loggedInUser={loggedInUser} />} />
              
            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>
        <Footer />
        {
          showSignUpModal && 
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }} 
          />
        }
        {
          showLoginModal && 
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }} 
          />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
