const ta = await Deno.readTextFile('./server/files/animals.txt');
const tc = await Deno.readTextFile('./server/files/colors.txt');
const th = await Deno.readTextFile('./server/files/hexs.txt');
const animals = ta.split('\n');
const colors = tc.split('\n');
const hexs = th.split('\n');

const name = (): string => {
    const na = Math.floor(Math.random() * Math.floor(animals.length));
    const nc = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[nc].trim() + ' ' + animals[na].trim();
}

const color = (): string => {
    const nh = Math.floor(Math.random() * Math.floor(hexs.length));
    return hexs[nh];
}

const randomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const randomSeed = (nbObstacles: number): string => {
    let s = "";
    let maxX = 4000;
    let maxY = 2500;
    for(let i = 0; i < nbObstacles; i++) {
        s += randomInt(100, maxX) + ':' + randomInt(100, maxY) + ':' + randomInt(50, 500) + ':' + randomInt(50, 500)
        if ( i < nbObstacles - 1) {
            s+= '.'
        }
    }
    return s;
}

export {
    name,
    color,
    randomInt,
    randomSeed
};
