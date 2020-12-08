const ta = await Deno.readTextFile('./files/animals.txt');
const tc = await Deno.readTextFile('./files/colors.txt');
const th = await Deno.readTextFile('./files/hexs.txt');
const animals = ta.split('\r\n');
const colors = tc.split('\r\n');
const hexs = th.split('\r\n');

const name = (): string => {
    const na = Math.floor(Math.random() * Math.floor(animals.length));
    const nc = Math.floor(Math.random() * Math.floor(colors.length));
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
