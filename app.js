const express = require('express');
const app = express()
const {ObjectId} = require('mongodb')
const {connectToDb, getDb} = require('./db')

let db
connectToDb((err) => {
  if(!err){
    app.listen(3000, () => {
      console.log("App listening on port 3000")
    })
    db = getDb()
    
  }
})

//routes

app.get('/books', (req, res) => {
  let books = []
  db.collection('books')
    .find()
    .sort({author: 1})
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({error: "Could not fetch documents"})
    })

})

app.get('/books/:id', (req, res) => {
 
  db.collection('books')
    .findOne({_id: new ObjectId(req.params.id)})
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err=> {
      res.status(500).json({error: "Could not fetch the documents"})
    })
})