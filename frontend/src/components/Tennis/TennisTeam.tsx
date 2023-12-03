import React from 'react';
import styles from "../../styles/Tennis.module.css";
import styleUtils from "../../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { TennisTeam as TennisTeamModel } from '../../models/tennis';
import { formatDate } from '../../utils/formatDate';
import { MdDelete, MdSystemUpdateAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

interface TennisTeamProps {
    tennisTeam: TennisTeamModel,
    onTennisTeamClicked: (tennisTeam: TennisTeamModel) => void,
    onDeleteTennisTeamClicked: (tennisTeam: TennisTeamModel) => void,
    getTennisTeam: (tennisTeam: TennisTeamModel) => void,
    className?: string,
}

const TennisTeam = ({ tennisTeam, onTennisTeamClicked, onDeleteTennisTeamClicked, getTennisTeam, className }: TennisTeamProps) => {

  const {
    teamTitle,
    teamText,
    createdAt,
    updatedAt,
    _id
  } = tennisTeam;

  let createdUpdatedText: string;

  if(updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt)
  }

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tennis/${_id}`, {
      state: {
        teamTitle,
        teamText,
        createdAt,
        updatedAt,
        _id,
      },
    });
  };

  return (
    <Card 
        className={`${styles.noteCard} ${className}`}
        onClick={() => handleCardClick()}
    >
        <Card.Body className={styles.cardBody}>
            <Card.Title className={styleUtils.flexCenter}>
                {teamTitle}
                <MdDelete 
                    className="text-muted ms-auto"
                    onClick={(e) => {
                        onDeleteTennisTeamClicked(tennisTeam);
                        e.stopPropagation();
                    }}
                />
                <MdSystemUpdateAlt 
                    className="text-muted"
                    onClick={(e) => {
                      onTennisTeamClicked(tennisTeam);
                      e.stopPropagation();
                    }}
                />
            </Card.Title>
            <Card.Text className={styles.cardText}>
                {teamText}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
            {createdUpdatedText}
        </Card.Footer>
    </Card>
  )
}

export default TennisTeam;
