const path = require('path')//core module - built in - no need to install
const express = require("express")
const hbs = require("hbs")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const app = express()
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

//app.com


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            forecast(latitude,longitude,(error,forecastdata)=>{
                    if(error)
                        return res.send({
                            error
                        })
                    res.send({
    
                        location,
                        forecast: forecastdata.currently,
                        address: req.query.address
                    })
                     })
          
            
        
        
        })
    }
})

app.get('/products',(req,res)=>{
  
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
  
  
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About'
    })

})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Dyuthi'
    })
})



app.get('*',(req,res)=>{
    res.render('notfound',{
       
        title:'404',
        msg:' Page not found'
      
    })
})

app.listen(port,()=>{
    console.log('Server up on '+ port)
})