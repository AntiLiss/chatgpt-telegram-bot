// async f() {
//   console.log('hello!');

//   readfile('file')
//     .then((res) => console.log(res));

//   console.log('bye!');
// }

// async f() {
//   console.log('hello!');

//   const res = await readfile('file');
//   console.log(res);

//   console.log('bye!');
// }

import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

async function read() {
  const res = await readFile('./py.py');
  console.log(res);
}

console.log('start');

readFile('./py.py')
  .then((res) => {
    console.log(res);
  });

read();

console.log('end');


