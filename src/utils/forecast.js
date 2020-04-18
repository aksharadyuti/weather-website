const request = require("request")
const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/5170cb8daca9894a2257a94335ae772a/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si&lang=en'

    request({ url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect')
        }
        else if(body.error){
            callback('Unable to find location')
        }
        else{
            callback(undefined,{
                currently :body.currently
            }
            )
        }
      
    })
}



module.exports = forecast