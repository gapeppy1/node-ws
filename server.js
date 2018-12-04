const express  = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))
app.use((req,res,next)=>{
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log',log + '\n', (err)=>{if (err) console.log(`appendFile failed - ${err}`)})
  next()
})
hbs.registerHelper('getCurrentYear',() => new Date().getFullYear())
hbs.registerHelper('screamIt',(text) => text.toUpperCase())

app.get('/', (req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage:  'Here\'s Johnny',
    currentYear: new Date().getFullYear()
  })
})

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  })
})

app.get('/bad', (req,res)=>{
  res.send('bad bad boy')
})

app.listen(3000, () => {
  console.log('server is up on #3000')
})

console.log('exiting server.js')
