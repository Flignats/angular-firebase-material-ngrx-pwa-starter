import { Timestamp } from '@firebase/firestore-types';

export interface IUser {
    createdAt: Timestamp;
    displayName: string;
    email: string;
    fcmTokens?: { [token: string]: true };
    level: {
        number: number;
        experience: number;
    };
    resources: IUserResources;
    shield: {
        active: boolean;
        activatedAt?: Timestamp,
        expiresAt?: Timestamp,
    };
    tasks: IUserTasks;
    tours: IUserTours;
    uid: string;
    updatedAt: Timestamp;
}

export interface IUserResources {
    population: {
        available: number;
        unavailable: number;
    };
    sand: number;
    stone: number;
    water: number;
    wood: number;
}

export interface IUserTasks {
    build: IUserTaskDetails;
    research: IUserTaskDetails;
    train: IUserTaskDetails;
}

export interface IUserTaskDetails {
    action: string;
    active: boolean;
    completesAt: Timestamp;
    startedAt: Timestamp;
}

export interface IUserTours {
    [key: string]: boolean;
}
