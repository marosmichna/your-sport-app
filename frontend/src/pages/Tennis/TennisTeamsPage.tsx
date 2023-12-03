import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { TennisTeam as TennisTeamModel } from '../../models/tennis';
import * as SportApi from "../../network/sports_api";
import styles from "../../styles/TennisTeamPage.module.css";
import styleUtils from "../../styles/utils.module.css";
import AddEditTennisTeamDialog from '../../components/Tennis/AddEditTennisTeamDialog';
import TennisTeam from '../../components/Tennis/TennisTeam';

const TennisTeamsPage = () => {

  const [tennisTeams, setTennisTeams] = useState<TennisTeamModel[]>([]);
  const [tennisTeamsLoading, setTennisTeamsLoading] = useState(true);
  const [showTennisTeamsLoadingError, setShowTennisTeamsLoadingError] = useState(false);

  const [showAddTennisTeamsDialog, setShowAddTennisTeamsDialog] = useState(false);
  const [tennisTeamToEdit, setTennisTeamToEdit] = useState<TennisTeamModel|null>(null);

  useEffect(() => {
    async function loadTennisTeams() {
      try {
        setShowTennisTeamsLoadingError(false);
        setTennisTeamsLoading(true);
        const tennisTeams = await SportApi.fetchTennisTeams();
        setTennisTeams(tennisTeams);
      } catch (error) {
        console.error(error);
        setShowTennisTeamsLoadingError(true);
      } finally {
        setTennisTeamsLoading(false);
      }
      
    } 
    loadTennisTeams(); 
  }, []);

  async function deleteTennisTeam(tennisTeam: TennisTeamModel) {
    try {
      await SportApi.deleteTennisTeam(tennisTeam._id);
      setTennisTeams(tennisTeams.filter(existingTennisTeam => existingTennisTeam._id !== tennisTeam._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function getTennisTeam(tennisTeam: TennisTeamModel) {
    try {
      await SportApi.fetchTennisTeam(tennisTeam._id);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const tennisTeamGrid = 
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {tennisTeams.map(tennisTeam => (
        <Col key={tennisTeam._id}>
          <TennisTeam
            tennisTeam={tennisTeam} 
            className={styles.note} 
            onDeleteTennisTeamClicked={deleteTennisTeam}
            onTennisTeamClicked={setTennisTeamToEdit}
            getTennisTeam={getTennisTeam}
          />
        </Col>
      ))}
    </Row>

  return (
    <>
      <Button 
          className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
          onClick={() => setShowAddTennisTeamsDialog(true)}
        >
          <FaPlus />
          Add new Tenis Team
        </Button>
        {
          tennisTeamsLoading && <Spinner animation="border" variant="primary" />
        }
        {
          showTennisTeamsLoadingError && <p>Something went wrong. Please refresh the page</p>
        }
        {
          !tennisTeamsLoading && !showTennisTeamsLoadingError &&
          <>
            {
              tennisTeams.length > 0 
                ? tennisTeamGrid
                : <p>You do not have any Tennis Teams yet</p>
            }
          </>
        }
        {
          showAddTennisTeamsDialog && 
          <AddEditTennisTeamDialog
            onDismiss={() => setShowAddTennisTeamsDialog(false)}
            onTennisTeamSaved={(newTennisTeam) => {
              setTennisTeams([...tennisTeams, newTennisTeam]);
              setShowAddTennisTeamsDialog(false);
            }}
          />
        }
        {
          tennisTeamToEdit &&
          <AddEditTennisTeamDialog 
            tennisTeamToEdit={tennisTeamToEdit}
            onDismiss={() => setTennisTeamToEdit(null)}
            onTennisTeamSaved={(updatedTennisTeam) => {
              setTennisTeams(tennisTeams.map(existingTennisTeam => existingTennisTeam._id === updatedTennisTeam._id ? updatedTennisTeam : existingTennisTeam))
              setTennisTeamToEdit(null);
            }}
          />
        }
    </>
  )
}

export default TennisTeamsPage;
