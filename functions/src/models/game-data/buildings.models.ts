export type BuildingIds =
    | 'arsenal'
    | 'assembly'
    | 'barracks'
    | 'flight_tower'
    | 'furnace'
    | 'house'
    | 'thinktank'
    | 'warehouse'
    | 'watchtower';

export interface IBuildings {
    [key: string]: any;
    arsenal: {
        a: IBuildingDetails;
        b: IBuildingDetails;
        c: IBuildingDetails;
        d: IBuildingDetails;
        e: IBuildingDetails;
        f: IBuildingDetails;
        g: IBuildingDetails;
        h: IBuildingDetails;
        i: IBuildingDetails;
        j: IBuildingDetails;
    };
    assembly: {
        a: IBuildingDetails;
        b: IBuildingDetails;
        c: IBuildingDetails;
        d: IBuildingDetails;
        e: IBuildingDetails;
        f: IBuildingDetails;
        g: IBuildingDetails;
        h: IBuildingDetails;
        i: IBuildingDetails;
        j: IBuildingDetails;
    };
    barracks: {
        a: IBuildingDetails;
        b: IBuildingDetails;
        c: IBuildingDetails;
        d: IBuildingDetails;
        e: IBuildingDetails;
        f: IBuildingDetails;
        g: IBuildingDetails;
        h: IBuildingDetails;
        i: IBuildingDetails;
        j: IBuildingDetails;
    };
    flight_tower: {
        a: IBuildingDetails;
        b: IBuildingDetails;
        c: IBuildingDetails;
        d: IBuildingDetails;
        e: IBuildingDetails;
        f: IBuildingDetails;
        g: IBuildingDetails;
        h: IBuildingDetails;
        i: IBuildingDetails;
        j: IBuildingDetails;
    };
    furnace: {
        a: IBuildingDetails;
        b: IBuildingDetails;
        c: IBuildingDetails;
        d: IBuildingDetails;
        e: IBuildingDetails;
        f: IBuildingDetails;
        g: IBuildingDetails;
        h: IBuildingDetails;
        i: IBuildingDetails;
        j: IBuildingDetails;
    };
    house: {
        a: IBuildingDetails;
        b: IBuildingDetails;
        c: IBuildingDetails;
        d: IBuildingDetails;
        e: IBuildingDetails;
        f: IBuildingDetails;
        g: IBuildingDetails;
        h: IBuildingDetails;
        i: IBuildingDetails;
        j: IBuildingDetails;
    };
    keep: {
        a: IBuildingDetails;
        b: IBuildingDetails;
        c: IBuildingDetails;
        d: IBuildingDetails;
        e: IBuildingDetails;
        f: IBuildingDetails;
        g: IBuildingDetails;
        h: IBuildingDetails;
        i: IBuildingDetails;
        j: IBuildingDetails;
    };
    thinktank: {
        a: IBuildingDetails;
        b: IBuildingDetails;
        c: IBuildingDetails;
        d: IBuildingDetails;
        e: IBuildingDetails;
        f: IBuildingDetails;
        g: IBuildingDetails;
        h: IBuildingDetails;
        i: IBuildingDetails;
        j: IBuildingDetails;
    };
    warehouse: {
        a: IBuildingDetails;
        b: IBuildingDetails;
        c: IBuildingDetails;
        d: IBuildingDetails;
        e: IBuildingDetails;
        f: IBuildingDetails;
        g: IBuildingDetails;
        h: IBuildingDetails;
        i: IBuildingDetails;
        j: IBuildingDetails;
    };
    watchtower: {
        a: IBuildingDetails;
        b: IBuildingDetails;
        c: IBuildingDetails;
        d: IBuildingDetails;
        e: IBuildingDetails;
        f: IBuildingDetails;
        g: IBuildingDetails;
        h: IBuildingDetails;
        i: IBuildingDetails;
        j: IBuildingDetails;
    };
}

export interface IBuildingDetails {
    buildTime: number;
    level: number;
    people: number;
    sand: number;
    stone: number;
    water: number;
    wood: number;
}

function createBuildingDetails(
    buildTime: number,
    level: number,
    people: number,
    sand: number,
    stone: number,
    water: number,
    wood: number
) {
    return {
        buildTime,
        level,
        people,
        sand,
        stone,
        water,
        wood
    };
}
// blood = sand
// steel = stone
// crystal = water
// concrete = wood
export const defaultBuildings: IBuildings = {
    arsenal: {
        a: createBuildingDetails(540, 1, 100, 100, 600, 250, 2000),
        b: createBuildingDetails(1093, 2, 100, 200, 1200, 500, 4000),
        c: createBuildingDetails(2214, 3, 100, 400, 2400, 1000, 8000),
        d: createBuildingDetails(4484, 4, 100, 800, 4800, 2000, 16000),
        e: createBuildingDetails(6984, 5, 100, 1600, 9600, 4000, 32000),
        f: createBuildingDetails(11523, 6, 100, 3200, 19200, 8000, 64000),
        g: createBuildingDetails(19590, 7, 100, 6400, 38400, 16000, 128000),
        h: createBuildingDetails(29385, 8, 100, 12800, 76800, 32000, 256000),
        i: createBuildingDetails(41139, 9, 100, 25600, 153600, 64000, 512000),
        j: createBuildingDetails(65822, 10, 100, 51200, 307200, 128000, 1024000)
    },
    assembly: {
        a: createBuildingDetails(90, 1, 100, 100, 600, 250, 2000),
        b: createBuildingDetails(182, 2, 100, 200, 1200, 500, 4000),
        c: createBuildingDetails(369, 3, 100, 400, 2400, 1000, 8000),
        d: createBuildingDetails(747, 4, 100, 800, 4800, 2000, 16000),
        e: createBuildingDetails(1513, 5, 100, 1600, 9600, 4000, 32000),
        f: createBuildingDetails(3064, 6, 100, 3200, 19200, 8000, 64000),
        g: createBuildingDetails(6435, 7, 100, 6400, 38400, 16000, 128000),
        h: createBuildingDetails(13512, 8, 100, 12800, 76800, 32000, 256000),
        i: createBuildingDetails(28375, 9, 100, 25600, 153600, 64000, 512000),
        j: createBuildingDetails(59588, 10, 100, 51200, 307200, 128000, 1024000)
    },
    barracks: {
        a: createBuildingDetails(30, 1, 150, 50, 150, 50, 400),
        b: createBuildingDetails(607, 2, 100, 500, 2400, 1000, 3000),
        c: createBuildingDetails(1230, 3, 100, 1000, 4800, 2000, 6000),
        d: createBuildingDetails(2491, 4, 100, 2000, 9600, 4000, 12000),
        e: createBuildingDetails(5044, 5, 100, 4000, 19200, 8000, 24000),
        f: createBuildingDetails(10215, 6, 100, 8000, 38400, 16000, 48000),
        g: createBuildingDetails(15767, 7, 100, 16000, 76800, 32000, 96000),
        h: createBuildingDetails(41888, 8, 100, 32000, 153600, 64000, 192000),
        i: createBuildingDetails(60588, 9, 100, 64000, 307200, 128000, 384000),
        j: createBuildingDetails(75000, 10, 100, 128000, 614400, 256000, 768000)
    },
    flight_tower: {
        a: createBuildingDetails(124, 1, 100, 1200, 2000, 1000, 800),
        b: createBuildingDetails(251, 2, 100, 2400, 4000, 2000, 1600),
        c: createBuildingDetails(508, 3, 100, 4800, 8000, 4000, 3200),
        d: createBuildingDetails(1029, 4, 100, 9600, 16000, 8000, 6400),
        e: createBuildingDetails(2085, 5, 100, 19200, 32000, 16000, 12800),
        f: createBuildingDetails(4222, 6, 100, 38400, 64000, 32000, 25600),
        g: createBuildingDetails(8549, 7, 100, 76800, 128000, 64000, 51200),
        h: createBuildingDetails(15388, 8, 100, 153600, 256000, 128000, 102400),
        i: createBuildingDetails(23083, 9, 100, 307200, 512000, 256000, 204800),
        j: createBuildingDetails(43857, 10, 100, 614400, 1024000, 512000, 409600)
    },
    furnace: {
        a: createBuildingDetails(180, 1, 100, 250, 1200, 500, 1500),
        b: createBuildingDetails(364, 2, 100, 500, 2400, 1000, 3000),
        c: createBuildingDetails(738, 3, 100, 1000, 4800, 2000, 6000),
        d: createBuildingDetails(1494, 4, 100, 2000, 9600, 4000, 12000),
        e: createBuildingDetails(3137, 5, 100, 4000, 19200, 8000, 24000),
        f: createBuildingDetails(5961, 6, 100, 8000, 38400, 16000, 48000),
        g: createBuildingDetails(11624, 7, 100, 16000, 76800, 32000, 96000),
        h: createBuildingDetails(19760, 8, 100, 32000, 153600, 64000, 192000),
        i: createBuildingDetails(28665, 9, 100, 64000, 307200, 128000, 384000),
        j: createBuildingDetails(58097, 10, 100, 128000, 614400, 256000, 768000)
    },
    house: {
        a: createBuildingDetails(30, 1, 25, 100, 50, 100, 500),
        b: createBuildingDetails(72, 2, 100, 200, 100, 200, 1000),
        c: createBuildingDetails(148, 3, 100, 400, 200, 400, 2000),
        d: createBuildingDetails(320, 4, 100, 800, 400, 800, 4000),
        e: createBuildingDetails(690, 5, 100, 1600, 800, 1600, 8000),
        f: createBuildingDetails(1396, 6, 100, 3200, 1600, 3200, 16000),
        g: createBuildingDetails(2827, 7, 100, 6400, 3200, 6400, 32000),
        h: createBuildingDetails(5718, 8, 100, 12800, 6400, 12800, 64000),
        i: createBuildingDetails(8256, 9, 100, 25600, 12800, 25600, 128000),
        j: createBuildingDetails(17520, 10, 100, 51200, 25600, 51200, 256000)
    },
    keep: {
        a: createBuildingDetails(5, 1, 100, 100, 50, 100, 500),
        b: createBuildingDetails(1822, 2, 100, 400, 600, 200, 5000),
        c: createBuildingDetails(3720, 3, 100, 800, 1200, 400, 10000),
        d: createBuildingDetails(7500, 4, 100, 1600, 2400, 800, 20000),
        e: createBuildingDetails(15133, 5, 100, 3200, 4800, 1600, 40000),
        f: createBuildingDetails(30645, 6, 100, 6400, 9600, 3200, 80000),
        g: createBuildingDetails(57120, 7, 100, 12800, 19200, 6400, 160000),
        h: createBuildingDetails(78540, 8, 100, 25600, 38400, 12800, 320000),
        i: createBuildingDetails(131580, 9, 100, 51200, 76800, 25600, 640000),
        j: createBuildingDetails(303120, 10, 100, 102400, 153600, 51200, 1280000)
    },
    thinktank: {
        a: createBuildingDetails(486, 1, 100, 120, 2500, 200, 1500),
        b: createBuildingDetails(972, 2, 100, 240, 5000, 400, 3000),
        c: createBuildingDetails(2093, 3, 100, 480, 10000, 800, 6000),
        d: createBuildingDetails(3985, 4, 100, 960, 20000, 1600, 12000),
        e: createBuildingDetails(8071, 5, 100, 1920, 40000, 3200, 16000),
        f: createBuildingDetails(18563, 6, 100, 38400, 80000, 6400, 32000),
        g: createBuildingDetails(31557, 7, 100, 7680, 160000, 12800, 64000),
        h: createBuildingDetails(52451, 8, 100, 15360, 320000, 25600, 128000),
        i: createBuildingDetails(108000, 9, 100, 30720, 640000, 51200, 256000),
        j: createBuildingDetails(221400, 10, 100, 61440, 1280000, 102400, 512000)
    },
    warehouse: {
        a: createBuildingDetails(600, 1, 100, 100, 1500, 300, 1000),
        b: createBuildingDetails(1215, 2, 100, 200, 3000, 600, 2000),
        c: createBuildingDetails(2460, 3, 100, 400, 6000, 1200, 4000),
        d: createBuildingDetails(4982, 4, 100, 800, 12000, 2400, 8000),
        e: createBuildingDetails(10089, 5, 100, 1600, 24000, 4800, 16000),
        f: createBuildingDetails(20430, 6, 100, 3200, 48000, 9600, 32000),
        g: createBuildingDetails(31823, 7, 100, 6400, 96000, 1900, 64000),
        h: createBuildingDetails(83777, 8, 100, 12800, 192000, 38400, 128000),
        i: createBuildingDetails(150798, 9, 100, 25600, 384000, 76800, 256000),
        j: createBuildingDetails(331756, 10, 100, 51200, 768000, 153600, 512000)
    },
    watchtower: {
        a: createBuildingDetails(300, 1, 100, 150, 1000, 300, 3000),
        b: createBuildingDetails(607, 2, 100, 300, 2000, 600, 6000),
        c: createBuildingDetails(1230, 3, 100, 600, 4000, 1200, 12000),
        d: createBuildingDetails(2491, 4, 100, 800, 8000, 2400, 24000),
        e: createBuildingDetails(5106, 5, 100, 1200, 16000, 4800, 48000),
        f: createBuildingDetails(8681, 6, 100, 2400, 32000, 9600, 96000),
        g: createBuildingDetails(15626, 7, 100, 4800, 64000, 1900, 192000),
        h: createBuildingDetails(35939, 8, 100, 9600, 128000, 38400, 384000),
        i: createBuildingDetails(64691, 9, 100, 19200, 256000, 76800, 768000),
        j: createBuildingDetails(90568, 10, 100, 38400, 512000, 153600, 1536000)
    }
};
