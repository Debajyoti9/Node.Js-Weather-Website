const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../Templates/views')
const partialsPath = path.join(__dirname, '../Templates/partials')
    //SetUp HaldleBar engine and views location
app.set('view engine', 'hbs') //app.set(key,value)
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
    //Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Debajyoti Shee'
    })

})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Debajoti Shee'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP!',
        name: 'Debajyoti Shee',
        email: 'debajyotishee@gmail.com',
        ask: 'Ask any question'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.Adress) {
        return res.send({
            error: 'you must provide the adress'
        })
    }
    geocode(req.query.Adress, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastdata,
                location,
                Adress: req.query.Adress
            })
        });
    });
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error!',
        name: 'Debajyoti Shee',
        errorMessage: 'Help Article Not Found'
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error!',
        name: 'Debajyoti Shee',
        errorMessage: 'Page Not Found!'
    })
})

app.listen(port, () => {
    console.log('Server is up port ' + port)
})