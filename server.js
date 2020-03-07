const express = require('express')
const db = require('./db')

const app = express()
// serve any files that exist directly out of public folder
// hint hint, could put index.html there...
app.use(express.static('public'))

// logging middleware
const volleyball = require('volleyball')
app.use(volleyball)


// bodyparser, fixes req.body to be an object
app.use(express.json())

// bad middleware, hands on any request..
// app.use((req, res, next) => {
//   console.log(req.url)
//   // next()
// })


// visitor counter thing
app.use(require('./counter'))


// we vibing
app.get('/vibecheck', (req, res, next) => {
  console.log(`we gucci, this is the ${count}th visitor`)
  // res.locals is a free object to add w/e you want to it!
  res.send(`we good, you're: ${res.locals.count}`)
})

// get all mail that exists...
app.get('/mail', async (req, res, next) => {
  const mail = await db.findAll()
  res.json(mail)
})

// create a new mail and return it...
app.post('/mail', async (req, res, next) => {
  const letter = await db.create(req.body)
  console.log(letter)
  // "what is 201?"
  // https://http.cat/201
  res.status(201).json(letter)
  // this is the same as just doing res.json
  // res.status(201)
  // res.setHeader('Content-Type', 'application/json; charset=utf-8')
  // res.send(letter)
})

// route parameter
app.post('/mail/to/:name', async (req, res, next) => {
  const to = req.params.name
  const letter = await db.create({
    ...req.body,
    to, // create a new obj with everything in req.body and add "to" to it!
  })
  res.status(201).json(letter)
})

// fetch a single letter
app.get('/mail/:id', async (req, res, next) => {
  const id = req.params.id
  const letter = await db.findById(id)
  res.json(letter)
})

// update ONLY the from for a certain id
app.put('/mail/:id', async (req, res, next) => {
  const id = req.params.id
  const letter = await db.findById(id)
  const newFrom = req.body.from
  if (!newFrom) {
    return next(new Error('You need to define a from...'))
  }
  letter.from = newFrom
  res.json(letter)
})

// echos back and query parameters you pass
app.get('/showQuery', (req, res, next) => {
  console.log(req.query)
  res.send(req.query)
})

// generic error handling
app.use((err, req, res, next) => {
  console.error(err)
  res.send(err.message)
})

// If I had a quarter...
app.listen(3000, () => {
  console.log('I\'m listening...')
})
