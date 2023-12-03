import { Schema, InferSchemaType, model } from "mongoose";

// Tennis Team Schema
const tennisSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    teamTitle: { type: String, required: true },
    teamText: { type: String },
}, {timestamps: true});

type Tennis = InferSchemaType<typeof tennisSchema>;

export const TennisModel = model<Tennis>("TennisTeam", tennisSchema);

// Tennis PLayer Schema
const tennisPlayerSchema = new Schema({
    tennisTeamId: { type: Schema.Types.ObjectId, required: true },
    playerFirstName: { type: String, required: true },
    playerSecondName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    playerNote: { type: String },
    playerScore: {type: Number, required: true},
    playerWon: {type: Number, required: true},
    playerLost: {type: Number, required: true},
}, {timestamps: true});

type TennisPlayer = InferSchemaType<typeof tennisPlayerSchema>;

export const TennisPlayerModel = model<TennisPlayer>("TennisPlayer", tennisPlayerSchema);
