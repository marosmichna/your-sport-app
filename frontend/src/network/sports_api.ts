import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { TennisTeam, TennisPlayer  } from "../models/tennis";
import { User } from "../models/user";

// Fetch Data
async function fetchData(input: RequestInfo, init?: RequestInit) {
   const response = await fetch(input, init);
   if (response.ok) {
        return response
   } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }

   }
}

/* USER */

// Get Logedin User
export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/your-sport/users", { method: "GET" });
    return response.json();
}

// SignUp User
export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/your-sport/users/signup",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

// Login User
export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/your-sport/users/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

// Logout User
export async function logout() {
    await fetchData("/your-sport/users/logout", { method: "POST" });
}

/*

*** TENNIS ***

*/

/* Tennis Team */


// Fetch Tennis Teams
export async function fetchTennisTeams(): Promise<TennisTeam []> {
    const response = await fetchData("/your-sport/tennis", { method: "GET" });
    return response.json();
}

// Create Tennis Team
export interface TennisTeamInput {
    teamTitle: string,
    teamText?: string,
}

export async function createTennisTeam(tennisTeam: TennisTeamInput): Promise<TennisTeam> {
    const response = await fetchData("/your-sport/tennis", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tennisTeam),
    });
    return response.json();
}

// Update Tennis Team
export async function updateTennisTeam(tennisTeamId: string, tennisTeam: TennisTeamInput): Promise<TennisTeam> {
    const response = await fetchData("/your-sport/tennis/" + tennisTeamId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tennisTeam),
        });
    return response.json();
}

// Delete Tennis Team
export async function deleteTennisTeam(tennisTeamId: string) {
    await fetchData("/your-sport/tennis/" + tennisTeamId, { method: "DELETE" });
}

// Fetch Tennis Team (One Team)

export async function fetchTennisTeam(tennisTeamId: string) {
    const response = await fetchData("/your-sport/tennis" + tennisTeamId, { method: "GET" });
    return response.json();
}


/* Tennis Players */


// Fetch Tennis Players
export async function fetchTennisPlayers(tennisTeamId: string): Promise<TennisPlayer []> {
    const response = await fetchData("/your-sport/tennis/team/" + tennisTeamId, { method: "GET" });
    return response.json();
}

// Create Tennis Player
export interface TennisPlayerInput {
    playerFirstName: string,
    playerSecondName: string,
    dateOfBirth: string,
    playerNote: string,
    playerScore: number,
    playerWon: number,
    playerLost: number,
}

export async function createTennisPlayer(tennisTeamId: string, tennisPlayer: TennisPlayerInput): Promise<TennisPlayer> {
    const response = await fetchData(`/your-sport/tennis/team/${tennisTeamId}`, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tennisPlayer),
    });
    return response.json();
}

// Update Tennis Player
export async function updateTennisPlayer(tennisTeamId: string, tennisPlayerId: string, tennisPlayer: TennisPlayerInput): Promise<TennisPlayer> {
    const response = await fetchData(`/your-sport/tennis/team/${tennisTeamId}/${tennisPlayerId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tennisPlayer),
        });
    return response.json();
}

// Delete Tennis Player
export async function deleteTennisPlayer(tennisTeamId: string, tennisPlayerId: string) {
    await fetchData(`/your-sport/tennis/team/${tennisTeamId}/${tennisPlayerId}`, { method: "DELETE" });
}