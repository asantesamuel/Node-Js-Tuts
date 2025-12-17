console.log('First');

setTimeout(() => {
  console.log('Second');
}, 0);

console.log('Third');


// Blocking approach ()
const data = readFileSync('file.txt');
console.log(data);
console.log('Done');



// Non-blocking approach 
readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log('Done');