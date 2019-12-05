import { BuildingIds } from './buildings.models';
import { IUserResources } from '@app/modules/user/user.model';
import { Timestamp } from '@firebase/firestore-types';

export interface IQuestDetails {
    id: string;
    isReadyToCollect: boolean;
    category: string;
    completed: boolean;
    requirements: {
        buildings?: {
            [key in BuildingIds]?: {
                level?: number;
                quantity?: number;
            };
        };
    };
    resources: Partial<IUserResources>;
    unlocksLand?: boolean;
}

export interface IUserQuests {
    createdAt: Timestamp;
    uid: string;
    updatedAt: Timestamp;
    questsCompleted: number;
    quests: {
        house_a: IQuestDetails;             // Build: House
        house_b: IQuestDetails;             // Upgrade: House => level 3
        house_c: IQuestDetails;             // Have: House => 3 qty
                                            // Sand, Stone, Water, Wood collected
                                            // Population
                                            // Join Alliance
                                            // Alliance quests
                                            // Research quests
                                            // Troops training
                                            // Troops killed
                                            // Troops Died
                                            // Pets: wallet address discovered
    };
}

// Model in Cloud Functions also needs to be updated
// View details are in Quests Module > components
export const defaultQuests = {
    house_a: {
        id: 'house_a',
        isReadyToCollect: false,
        category: 'city',
        completed: false,
        requirements: {
            buildings: { house: { level: 1, quantity: 1 } }
        },
        resources: { sand: 50, stone: 150, water: 50, wood: 400 },
        unlocksLand: true,
    },
    house_b: {
        id: 'house_b',
        isReadyToCollect: false,
        category: 'city',
        completed: false,
        requirements: {
            buildings: { house: { level: 3, quantity: 1 } }
        },
        resources: { sand: 500, stone: 2000, water: 500, wood: 500 },
        unlocksLand: true,
    },
    house_c: {
        id: 'house_c',
        isReadyToCollect: false,
        category: 'city',
        completed: false,
        requirements: {
            buildings: { house: { quantity: 3 } }
        },
        resources: { sand: 350, stone: 1500, water: 350, wood: 300 }
    },
};
