import axios from 'axios';


// console.log('start');

// // This is how to make setTimeout await
// const empty = await new Promise((res) => setTimeout(res, 5000));
// console.log(empty);

// console.log('end');





console.log('code start');

await new Promise((res) => {
  setTimeout(() => {
    console.log('timer');
    res();
  }, 3000);
});

await axios.get('https://jsonplaceholder.typicode.com/posts');
console.log('network request');

console.log('code end');
