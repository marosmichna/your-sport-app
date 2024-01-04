export interface TennisTeam {
    _id: string,
    teamTitle: string,
    teamText?:string,
    createdAt: string,
    updatedAt: string,
}

export interface TennisPlayer {
    _id: string,
    playerFirstName: string,
    playerSecondName: string,
    dateOfBirth: string,
    playerNote?: string,
    playerScore: number,
    playerWon: number,
    playerLost: number,
    createdAt: string,
    updatedAt: string,
}