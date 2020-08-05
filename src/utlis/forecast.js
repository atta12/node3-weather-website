const request = require('request')

const forecast = (longitude,latitude,callback) => 
{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon='+ longitude +'&appid=640a60f7425478315bdde1097db1dab6'
    //const url = 'http://api.weatherapi.com/v1/current.json?key=4724291a928f42d0a8c175617202607&q=Pakistan'
    request({ url, json: true},(error,{ body})=>{
    //console.log(response.body.current)
        if(error)
        {
            callback('Unable to connect weather service',undefined)
        }
        else if(body.error)
        {
            callback('Unable to Find Location',undefined)
        }
        else{
            callback(undefined,body.weather[0].description + '. It is Currently ' + body.main.temp + ' degrees out. There is a ' + body.main.pressure + ' chance of rain.')
        }
    })
}


module.exports = forecast