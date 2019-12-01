export interface IBuildings {
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
    sand: number;
    stone: number;
    water: number;
    wood: number;
}

function createBuildingDetails(
    buildTime: number,
    level: number,
    sand: number,
    stone: number,
    water: number,
    wood: number
) {
    return {
        buildTime,
        level,
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
        a: createBuildingDetails(540, 1, 100, 600, 250, 2000),
        b: createBuildingDetails(1093, 2, 200, 1200, 500, 4000),
        c: createBuildingDetails(2214, 3, 400, 2400, 1000, 8000),
        d: createBuildingDetails(4484, 4, 800, 4800, 2000, 16000),
        e: createBuildingDetails(6984, 5, 1600, 9600, 4000, 32000),
        f: createBuildingDetails(11523, 6, 3200, 19200, 8000, 64000),
        g: createBuildingDetails(19590, 7, 6400, 38400, 16000, 128000),
        h: createBuildingDetails(29385, 8, 12800, 76800, 32000, 256000),
        i: createBuildingDetails(41139, 9, 25600, 153600, 64000, 512000),
        j: createBuildingDetails(65822, 10, 51200, 307200, 128000, 1024000)
    },
    assembly: {
        a: createBuildingDetails(90, 1, 100, 600, 250, 2000),
        b: createBuildingDetails(182, 2, 200, 1200, 500, 4000),
        c: createBuildingDetails(369, 3, 400, 2400, 1000, 8000),
        d: createBuildingDetails(747, 4, 800, 4800, 2000, 16000),
        e: createBuildingDetails(1513, 5, 1600, 9600, 4000, 32000),
        f: createBuildingDetails(3064, 6, 3200, 19200, 8000, 64000),
        g: createBuildingDetails(6435, 7, 6400, 38400, 16000, 128000),
        h: createBuildingDetails(13512, 8, 12800, 76800, 32000, 256000),
        i: createBuildingDetails(28375, 9, 25600, 153600, 64000, 512000),
        j: createBuildingDetails(59588, 10, 51200, 307200, 128000, 1024000)
    },
    barracks: {
        a: createBuildingDetails(300, 1, 250, 1200, 500, 1500),
        b: createBuildingDetails(607, 2, 500, 2400, 1000, 3000),
        c: createBuildingDetails(1230, 3, 1000, 4800, 2000, 6000),
        d: createBuildingDetails(2491, 4, 2000, 9600, 4000, 12000),
        e: createBuildingDetails(5044, 5, 4000, 19200, 8000, 24000),
        f: createBuildingDetails(10215, 6, 8000, 38400, 16000, 48000),
        g: createBuildingDetails(15767, 7, 16000, 76800, 32000, 96000),
        h: createBuildingDetails(41888, 8, 32000, 153600, 64000, 192000),
        i: createBuildingDetails(60588, 9, 64000, 307200, 128000, 384000),
        j: createBuildingDetails(75000, 10, 128000, 614400, 256000, 768000)
    },
    flight_tower: {
        a: createBuildingDetails(124, 1, 1200, 2000, 1000, 800),
        b: createBuildingDetails(251, 2, 2400, 4000, 2000, 1600),
        c: createBuildingDetails(508, 3, 4800, 8000, 4000, 3200),
        d: createBuildingDetails(1029, 4, 9600, 16000, 8000, 6400),
        e: createBuildingDetails(2085, 5, 19200, 32000, 16000, 12800),
        f: createBuildingDetails(4222, 6, 38400, 64000, 32000, 25600),
        g: createBuildingDetails(8549, 7, 76800, 128000, 64000, 51200),
        h: createBuildingDetails(15388, 8, 153600, 256000, 128000, 102400),
        i: createBuildingDetails(23083, 9, 307200, 512000, 256000, 204800),
        j: createBuildingDetails(43857, 10, 614400, 1024000, 512000, 409600)
    },
    furnace: {
        a: createBuildingDetails(180, 1, 250, 1200, 500, 1500),
        b: createBuildingDetails(364, 2, 500, 2400, 1000, 3000),
        c: createBuildingDetails(738, 3, 1000, 4800, 2000, 6000),
        d: createBuildingDetails(1494, 4, 2000, 9600, 4000, 12000),
        e: createBuildingDetails(3137, 5, 4000, 19200, 8000, 24000),
        f: createBuildingDetails(5961, 6, 8000, 38400, 16000, 48000),
        g: createBuildingDetails(11624, 7, 16000, 76800, 32000, 96000),
        h: createBuildingDetails(19760, 8, 32000, 153600, 64000, 192000),
        i: createBuildingDetails(28665, 9, 64000, 307200, 128000, 384000),
        j: createBuildingDetails(58097, 10, 128000, 614400, 256000, 768000)
    },
    house: {
        a: createBuildingDetails(5, 1, 100, 50, 100, 500),
        b: createBuildingDetails(20, 2, 200, 100, 200, 1000),
        c: createBuildingDetails(41, 3, 400, 200, 400, 2000),
        d: createBuildingDetails(83, 4, 800, 400, 800, 4000),
        e: createBuildingDetails(168, 5, 1600, 800, 1600, 8000),
        f: createBuildingDetails(340, 6, 3200, 1600, 3200, 16000),
        g: createBuildingDetails(690, 7, 6400, 3200, 6400, 32000),
        h: createBuildingDetails(1396, 8, 12800, 6400, 12800, 64000),
        i: createBuildingDetails(2827, 9, 25600, 12800, 25600, 128000),
        j: createBuildingDetails(5718, 10, 51200, 25600, 51200, 256000)
    },
    thinktank: {
        a: createBuildingDetails(486, 1, 120, 2500, 200, 1500),
        b: createBuildingDetails(972, 2, 240, 5000, 400, 3000),
        c: createBuildingDetails(2093, 3, 480, 10000, 800, 6000),
        d: createBuildingDetails(3985, 4, 960, 20000, 1600, 12000),
        e: createBuildingDetails(8071, 5, 1920, 40000, 3200, 16000),
        f: createBuildingDetails(18563, 6, 38400, 80000, 6400, 32000),
        g: createBuildingDetails(31557, 7, 7680, 160000, 12800, 64000),
        h: createBuildingDetails(52451, 8, 15360, 320000, 25600, 128000),
        i: createBuildingDetails(108000, 9, 30720, 640000, 51200, 256000),
        j: createBuildingDetails(221400, 10, 61440, 1280000, 102400, 512000)
    },
    warehouse: {
        a: createBuildingDetails(600, 1, 100, 1500, 300, 1000),
        b: createBuildingDetails(1215, 2, 200, 3000, 600, 2000),
        c: createBuildingDetails(2460, 3, 400, 6000, 1200, 4000),
        d: createBuildingDetails(4982, 4, 800, 12000, 2400, 8000),
        e: createBuildingDetails(10089, 5, 1600, 24000, 4800, 16000),
        f: createBuildingDetails(20430, 6, 3200, 48000, 9600, 32000),
        g: createBuildingDetails(31823, 7, 6400, 96000, 1900, 64000),
        h: createBuildingDetails(83777, 8, 12800, 192000, 38400, 128000),
        i: createBuildingDetails(150798, 9, 25600, 384000, 76800, 256000),
        j: createBuildingDetails(331756, 10, 51200, 768000, 153600, 512000)
    },
    watchtower: {
        a: createBuildingDetails(300, 1, 150, 1000, 300, 3000),
        b: createBuildingDetails(607, 2, 300, 2000, 600, 6000),
        c: createBuildingDetails(1230, 3, 600, 4000, 1200, 12000),
        d: createBuildingDetails(2491, 4, 800, 8000, 2400, 24000),
        e: createBuildingDetails(5106, 5, 1200, 16000, 4800, 48000),
        f: createBuildingDetails(8681, 6, 2400, 32000, 9600, 96000),
        g: createBuildingDetails(15626, 7, 4800, 64000, 1900, 192000),
        h: createBuildingDetails(35939, 8, 9600, 128000, 38400, 384000),
        i: createBuildingDetails(64691, 9, 19200, 256000, 76800, 768000),
        j: createBuildingDetails(90568, 10, 38400, 512000, 153600, 1536000)
    }
};
