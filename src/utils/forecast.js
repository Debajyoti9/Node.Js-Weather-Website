const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9aef2f43b895032dc74be94b350060a2/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect weather forecast!', undefined)
        } else if (body.error) {
            callback('Unable to Find Location!', undefined)
        } else {
            const temp = Math.floor(((body.currently.temperature - 32) * 5) / 9);
            const dew = Math.floor(((body.currently.dewPoint - 32) * 5) / 9);
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out.' + 'There is ' + body.currently.precipProbability + '% probability of Rain.' + ' Dew present in weather ' + dew + ' Humidity in nature is ' + body.currently.humidity + ' Wind speed ' + body.currently.windSpeed)
        }

    })
}

module.exports = forecast