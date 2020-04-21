

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p1')
//const messageTwo = document.querySelector('#p2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageOne.textContent="Loading.."
    //messageTwo.textContent = ''
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
           if(data.error){
            messageOne.textContent = data.error
            
        }
           else{
            messageOne.innerHTML = "<br>"+ data.location + "<br><br><br>" + data.forecast.summary + "<br><br> Temperature: " + data.forecast.temperature 
            messageOne.innerHTML += "<br><br> Humidity: " + data.forecast.humidity
            messageOne.innerHTML +="<br><br> Probability of precipitation: "+data.forecast.precipProbability + "<br>"
            
            const more = document.createElement("button")
            more.id = "moreB"
            more.innerHTML = "More details"
            messageOne.append(more)
            more.onclick = ()=>{
                messageOne.removeChild(more)
                messageOne.innerHTML += "<br> Apparent temperature: " + data.forecast.apparentTemperature
                messageOne.innerHTML += "<br><br> Precipitation intensity: "+ data.forecast.precipIntensity
                messageOne.innerHTML += "<br><br> Pressure: " + data.forecast.pressure
                messageOne.innerHTML += "<br><Br> Dewpoint: "+ data.forecast.dewPoint

            }
           }
    })

})
})



