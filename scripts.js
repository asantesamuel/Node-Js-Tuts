// // const fs = require('fs');
// // const content = "This is my first file, hello world!"
// // // creating a file
// // fs.writeFile("file.txt", content, (err) => {
// //     if (err) {
// //         console.log(err)
// //     } else {
// //         console.log("File written successfully")
// //     }
// //  })

// // // reading a file
// // fs.readFile("file.txt", "utf-8", (err, data) => {
// //     if(err){
// //         return console.error("Error writing file", err)
// //     } else{
// //         console.log(data)
// //     }
// // })

// // //appending to a file
// // fs.appendFile("file.txt", "\n this is an appended text", (err)=>{
// // console.log("Sucessfully appended a text into a file")
// // })

// // //reading after appending
// // fs.readFile("file.txt", "utf-8", (err, data) => {
// //     if(err){
// //         console.log(err)
// //     } else{
// //         console.log(data)
// //     }
// // })

// // //deleting a file
// // fs.unlink("file.txt", (err)=>{
// //     console.log("file deleted successfully")
// // })

// const fs = require("fs").promises;

// (async () => {
//   const content = "This is my first file, hello world!";

//   // write
//   await fs.writeFile("file.txt", content);
//   console.log("File written successfully");

//   // read
//   let data = await fs.readFile("file.txt", "utf-8");
//   console.log(data);

//   // append
//   await fs.appendFile("file.txt", "\nThis is appended text");
//   console.log("Successfully appended text");

//   // read again
//   data = await fs.readFile("file.txt", "utf-8");
//   console.log(data);

//   // delete
//   await fs.unlink("file.txt");
//   console.log("File deleted successfully");
// })();



const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.status(200)
  res.render("index")
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`)
})

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)