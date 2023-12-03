import React, { useEffect, useState } from 'react'
import { User } from '../../models/user';
import { useLocation } from 'react-router';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import { TennisPlayer as TennisPlayerModel } from '../../models/tennis';
import * as SportApi from "../../network/sports_api";
import AddEditTennisPlayerDialog from '../../components/Tennis/AddEditTennisPlayerDialog';

interface TennisTeamDetailPageProps {
  loggedInUser: User | null,
}

const TennisTeamDetailPage = ({ loggedInUser }: TennisTeamDetailPageProps) => {

  const { state } = useLocation();

  const {
    teamTitle,
    teamText,
    createdAt,
    updatedAt,
    _id,
  } = state;

  const [tennisPlayers, setTennisPlayers] = useState<TennisPlayerModel[]>([]);
  const [tennisPlayersLoading, setTennisPlayersLoading] = useState(true);
  const [showTennisPlayersLoadingError, setShowTennisPlayersLoadingError] = useState(false);
  const [showAddTennisPlayersDialog, setShowAddPlayersTeamsDialog] = useState(false);
  const [tennisPlayerToEdit, setTennisPlayerToEdit] = useState<TennisPlayerModel | null>(null);

  useEffect(() => {
    async function loadTennisPlayers() {
      try {
        setShowTennisPlayersLoadingError(false);
        setTennisPlayersLoading(true);
        const tennisPlayers = await SportApi.fetchTennisPlayers(_id);
        setTennisPlayers(tennisPlayers);
      } catch (error) {
        console.error(error);
        setShowTennisPlayersLoadingError(true);
      } finally {
        setTennisPlayersLoading(false);
      }
    }
    loadTennisPlayers();
  }, [])

  const tennisPlayerTable =
    <Table>
      <thead>
        <tr>
            <th>#</th>             
            <th>First Name</th>             
            <th>Second Name</th>             
            <th>Score</th>             
            <th>Won</th>             
            <th>Lost</th>             
        </tr>
      </thead>
      {
        tennisPlayers.map((tennisPlayer, index)  => (
          <tbody key={tennisPlayer._id}>
            <tr>
                <td>{index + 1}</td>
                <td>{tennisPlayer.playerFirstName}</td>
                <td>{tennisPlayer.playerSecondName}</td>
                <td>{tennisPlayer.playerScore}</td>
                <td>{tennisPlayer.playerWon}</td>
                <td>{tennisPlayer.playerLost}</td>
            </tr>
          </tbody>      
        ))
      }
    </Table>    

  return (
    <Container className="text-center">
      {
        loggedInUser && 
        <div>
          <h1>{teamTitle}</h1>
          <p>{teamText}</p>
          <Button 
            variant='primary'
            onClick={() => setShowAddPlayersTeamsDialog(true)}
          >
              Add Tennis Player</Button>
        </div>
      }
      {
        tennisPlayersLoading && <Spinner animation="border" variant="primary" />
      }
      {
        showTennisPlayersLoadingError && <p>Something went wrong. Please refresh the page</p>
      }
      {
        !tennisPlayersLoading && !showTennisPlayersLoadingError &&
        <>
          {
            tennisPlayers.length > 0 
              ? tennisPlayerTable
              : <p>You do not have any Tennis Teams yet</p>
          }
        </>
    }
    {
      showAddTennisPlayersDialog && 
      <AddEditTennisPlayerDialog 
        tennisTeamId={_id}
        onDismiss={() => setShowAddPlayersTeamsDialog(false)}
        onTennisPlayerSaved={(newTennisPlayer) => {
          setTennisPlayers([...tennisPlayers, newTennisPlayer]);
          setShowAddPlayersTeamsDialog(false);
        }}
      />
    }
    </Container>
  )
}

export default TennisTeamDetailPage
