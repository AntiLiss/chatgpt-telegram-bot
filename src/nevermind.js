console.log('start');

// This is how to make setTimeout await
const empty = await new Promise((res) => setTimeout(res, 5000));
console.log(empty);

console.log('end');
