import express from "express";
import * as TennisController from "../controllers/tennis";


const router = express.Router();

// Tennis Team

router.get("/", TennisController.getTennisTeams);

router.get("/:tennisTeamId", TennisController.getTennisTeam);

router.post("/", TennisController.createTennisTeam);

router.patch("/:tennisTeamId", TennisController.updateTennisTeam);

router.delete("/:tennisTeamId", TennisController.deleteTennisTeam);

// Tennis Player

router.get("/team/:tennisTeamId", TennisController.getTennisPlayers);

router.post("/team/:tennisTeamId", TennisController.createTennisPlayer);

router.patch("/team/:tennisTeamId/:tennisPlayerId", TennisController.updateTennisTeam);

export default router;