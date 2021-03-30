const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9e60da69627eff62ee5066b9cb0c0e14&query=' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            data = body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degree celsius, but it feels like " + body.current.feelslike + ' degree celsius';
            callback(undefined, data);
        }
    })
}

module.exports = forecast