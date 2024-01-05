import { RequestHandler } from "express";
import { TennisModel, TennisPlayerModel } from "../models/tennis";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/asserIsDefined";

/* Tennis Team */

// Get TennisTeams
export const getTennisTeams: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        const tennisTeams = await TennisModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(tennisTeams);
    } catch (error) {
        next(error);
    }
    
};

//Get TennisTeam
export const getTennisTeam: RequestHandler = async (req, res, next) => {
    const tennisTeamId = req.params.tennisTeamId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(tennisTeamId)) {
            throw createHttpError(400, "Invalid Tennis Team id");
        }

        const tennisTeam = await TennisModel.findById(tennisTeamId).exec();

        if (!tennisTeam) {
            throw createHttpError(404, "TEnnis Team not found");
        }

        if (!tennisTeam.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this Tennis Team");
        }

        res.status(200).json(tennisTeam);
    } catch (error) {
        next(error);
    }
};

// Create Tennis Team
interface CreateTennisTeamBody {
    teamTitle?: string,
    teamText?: string,
}

export const createTennisTeam: RequestHandler<unknown, unknown, CreateTennisTeamBody, unknown> = async (req, res, next) => {
    const teamTitle = req.body.teamTitle;
    const teamText = req.body.teamText;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!teamTitle) {
            throw createHttpError(400, "Tennis Team must have a title");
        }

        const newTennisTeam = await TennisModel.create({
            userId: authenticatedUserId,
            teamTitle: teamTitle,
            teamText: teamText,
        });

        res.status(201).json(newTennisTeam);
    } catch (error) {
        next(error);
    }
};

// Update Tennis Team
interface UpdateTennisTeamParams {
    tennisTeamId: string,
}

interface UpdateTennisTeamBody {
    teamTitle?: string,
    teamText?: string,
}

export const updateTennisTeam: RequestHandler<UpdateTennisTeamParams, unknown, UpdateTennisTeamBody, unknown> = async (req, res, next) => {
    const tennisTeamId = req.params.tennisTeamId;
    const newTitle = req.body.teamTitle;
    const newText = req.body.teamText;
    const authenticatedUserId = req.session.userId;
    
    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(tennisTeamId)) {
            throw createHttpError(400, "Invalid Tennis Team id");
        }

        if (!newTitle) {
            throw createHttpError(400, "Tennis Team must have a title");
        }

        const tennisTeam = await TennisModel.findById(tennisTeamId).exec();

        if (!tennisTeam) {
            throw createHttpError(404, "Tennis Team not found");
        }

        if (!tennisTeam.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this Tennis Team");
        }

        tennisTeam.teamTitle = newTitle;
        tennisTeam.teamText = newText;

        const updatedTennisTeam = await tennisTeam.save();

        res.status(200).json(updatedTennisTeam);
    } catch (error) {
        next(error);
    }
};

// delete Tennis Team
export const deleteTennisTeam: RequestHandler = async (req, res, next) => {
    const tennisTeamId = req.params.tennisTeamId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(tennisTeamId)) {
            throw createHttpError(400, "Invalid Tennis Team id");
        }

        const tennisTeam = await TennisModel.findById(tennisTeamId).exec();

        if (!tennisTeam) {
            throw createHttpError(404, "Tennis Team not found");
        }

        if (!tennisTeam.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this Tennis Team");
        }

        await tennisTeam.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next();
    }
};

/* Tennis Player*/

// Get Tennis Players
export const getTennisPlayers: RequestHandler = async (req, res, next) => {
    const authenticatedTennisTeamId = req.params.tennisTeamId;

    try {
        assertIsDefined(authenticatedTennisTeamId);
        const tennisPlayers = await TennisPlayerModel .find({tennisTeamId: authenticatedTennisTeamId}).exec();
        res.status(200).json(tennisPlayers);
    } catch (error) {
        next(error);
    }
    
};

// Create Tennis Player
interface CreateTennisPLayerBody {
    playerFirstName?: string,
    playerSecondName?: string,
    dateOfBirth?: Date,
    playerNote?: string,
    playerScore?: number,
    playerWon?: number,
    playerLost?: number,
}

export const createTennisPlayer: RequestHandler<unknown, unknown, CreateTennisPLayerBody, unknown> = async (req, res, next) => {
    const playerFirstName = req.body.playerFirstName;
    const playerSecondName = req.body.playerSecondName;
    const dateOfBirth = req.body.dateOfBirth;
    const playerNote = req.body.playerNote;
    const playerScore = req.body.playerScore;
    const playerWon = req.body.playerWon;
    const playerLost = req.body.playerLost;
    const authenticatedTennisTeamId = (req.params as { tennisTeamId: string }).tennisTeamId;

    try {
        assertIsDefined(authenticatedTennisTeamId);

        if (!playerFirstName && !playerSecondName && !dateOfBirth && !playerScore && !playerWon && !playerLost) {
            throw createHttpError(400, "Tennis Player must have a First name, Second name, Date of birth");
        }

        const newTennisPlayer = await TennisPlayerModel .create({
            tennisTeamId: authenticatedTennisTeamId,
            playerFirstName: playerFirstName,
            playerSecondName: playerSecondName,
            dateOfBirth: dateOfBirth,
            playerNote: playerNote,
            playerScore: playerScore,
            playerWon: playerWon,
            playerLost: playerLost,
        });

        res.status(201).json(newTennisPlayer);
    } catch (error) {
        next(error);
    }
};

// Update Tennis Player
interface UpdateTennisPlayerParams {
    tennisTeamId: string,
    tennisPlayerId: string,
}

interface UpdateTennisPlayerBody {
    playerFirstName?: string,
    playerSecondName?: string,
    dateOfBirth?: Date,
    playerNote?: string,
    playerScore?: number,
    playerWon?: number,
    playerLost?: number,
}

export const updateTennisPlayer: RequestHandler<UpdateTennisPlayerParams, unknown, UpdateTennisPlayerBody, unknown> = async (req, res, next) => {
    const tennisTeamId = req.params.tennisTeamId;
    const tennisPlayerId = req.params.tennisPlayerId
    const newPlayerFirstName = req.body.playerFirstName;
    const newPlayerSecondName = req.body.playerSecondName;
    const newDateOfBirth = req.body.dateOfBirth;
    const newPlayerNote = req.body.playerNote;
    const newPlayerScore = req.body.playerScore;
    const newPlayerWon = req.body.playerWon;
    const newPlayerLost = req.body.playerLost
    const authenticatedUserId = req.session.userId;
    
    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(tennisTeamId && tennisPlayerId)) {
            throw createHttpError(400, "Invalid Tennis Team or Tennis player id");
        }

        if (!newPlayerFirstName && !newPlayerSecondName && newDateOfBirth) {
            throw createHttpError(400, "Tennis Team must have a First Name, Second Name and Date of birth");
        }

        const tennisTeam = await TennisModel.findById(tennisTeamId).exec();

        if (!tennisTeam) {
            throw createHttpError(404, "Tennis Team not found");
        }

        if (!tennisTeam.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this Tennis Team");
        }

        const tennisPlayer = await TennisPlayerModel.findById(tennisPlayerId).exec();

        if (!tennisPlayer) {
            throw createHttpError(404, "Tennis Player not found");
        }

        tennisPlayer.playerFirstName = newPlayerFirstName || tennisPlayer.playerFirstName;
        tennisPlayer.playerSecondName = newPlayerSecondName || tennisPlayer.playerSecondName;
        tennisPlayer.dateOfBirth = newDateOfBirth || tennisPlayer.dateOfBirth;
        tennisPlayer.playerNote = newPlayerNote || tennisPlayer.playerNote;
        tennisPlayer.playerScore = newPlayerScore || tennisPlayer.playerScore;
        tennisPlayer.playerWon = newPlayerWon || tennisPlayer.playerWon;
        tennisPlayer.playerLost = newPlayerLost || tennisPlayer.playerLost;

        const updateTennisPlayer = await tennisPlayer.save();

        res.status(200).json(updateTennisPlayer);
    } catch (error) {
        next(error);
    }
};

// delete Tennis Player
export const deleteTennisPlayer: RequestHandler = async (req, res, next) => {
    const tennisTeamId = req.params.tennisTeamId;
    const tennisPlayerId = req.params.tennisPlayerId
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(tennisTeamId && tennisPlayerId)) {
            throw createHttpError(400, "Invalid Tennis Team or Tennis Player id");
        }

        const tennisTeam = await TennisModel.findById(tennisTeamId).exec();

        if (!tennisTeam) {
            throw createHttpError(404, "Tennis Team not found");
        }

        if (!tennisTeam.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this Tennis Team");
        }

        const tennisPlayer = await TennisPlayerModel.findById(tennisPlayerId).exec();

        if (!tennisPlayer) {
            throw createHttpError(404, "Tennis Player not found");
        }

        await tennisPlayer.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next();
    }
};