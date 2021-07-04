const ta = await Deno.readTextFile('./server/files/animals.txt');
const tc = await Deno.readTextFile('./server/files/colors.txt');
const th = await Deno.readTextFile('./server/files/hexs.txt');
const animals = ta.split('\n');
const colors = tc.split('\n');
const hexs = th.split('\n');

const name = (): string => {
    const na = Math.floor(Math.random() * Math.floor(animals.length-1));
    const nc = Math.floor(Math.random() * Math.floor(colors.length-1));
    return colors[nc] + ' ' + animals[na];
}

const color = (): string => {
    const nh = Math.floor(Math.random() * Math.floor(hexs.length));
    return hexs[nh];
}

export {
    name,
    color
};
