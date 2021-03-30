const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public/')) //setting path to serve static files

const app = express() //variable to store our Express application.Express function doesn't take in any arguments. Instead we configure our server by using various methods provided on the application itself.
const port = process.env.PORT || 3000 //env is an object and it's where we can access environment variables. Now this is exactly what Heroku sets for port

//define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlerbar engine and views location 
app.set('view engine', 'hbs') //The default engine extension to use when omitted is hbs, This will render .hbs files when res.render is called.to tell Express which templating engine we installed
app.set('views', viewsPath) //customizing views to look at templates folder instead of default views folder
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))  //absolute path, serving up the directory, express.static is a function, We're calling it and we're passing its return value into use.Now static takes the path to the folder we want to serve up


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sushmitha'
    }) //to render one of our views, We've configured express to use the view engine hbs so with render we can render one of our handlebars templates
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sushmitha',
        text: 'I am a budding web developer'
    })
}) //sets up our server to send a response when someone tries to get something at a specific route/url, may be html or json.

app.get('/weather', (req, res) => { 
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address!!'
        })
    }

    else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //in case of error, if u try to destructure data object to get lat,lon and loc, which is undefined, u get error, so make it equal to empty {} as a default.
        if(error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location: location,
                forecastData: forecastData
            })
        })
    })
    } 
})

app.get('*', (req, res) => {
    res.render('error', {
        error_msg: '404 error!! Page not found!!',
        name: 'Sushmitha'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})  //starting up the server, process of starting up a server isn't a synchronous process 


//start script in package.json tells Heroku how to start up our app and the value is the command to run

//npm run start - this is a command we can run to start up our application locally.
//This is the exact command that Heroku is going to run to start up our application on their servers.