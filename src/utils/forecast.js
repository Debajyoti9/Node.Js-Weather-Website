const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9aef2f43b895032dc74be94b350060a2/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect weather forecast!', undefined)
        } else if (body.error) {
            callback('Unable to Find Location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out.' + 'There is ' + body.currently.precipProbability + '% probability of Rain.')
        }

    })
}

module.exports = forecast