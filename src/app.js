const express = require('express')
const request = require('request')
const path = require('path')
const hbs = require('hbs')
const app = express()

//Loading Files
const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')
//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'..'))

//Define express Paths for Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Hablebars and views engine
app.set('view engine','hbs')
app.set('views' ,viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to use
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Atta ur Rahman'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Atta ur Rahman'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Me',
        name:'Atta ur Rahman',
        helptext:'This is some helpful text.'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }
    else
    {
        geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
            if(error === undefined)
            {
                forecast(longitude,latitude,(error,forecastdata)=>{
                if(error === undefined)
                {
                    res.send({
                        forecast:forecastdata,
                        location,
                        address:req.query.address})
                }
                else
                {
                    res.send({error})
                }
        })
        }
        else
        {
            res.send({error})
        }
        })
    }
})

// app.get('/products',(req,res) => {
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Atta ur Rahman',
        errorMessage:'Please Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Atta ur Rahman',
        errorMessage:'Page Not Found'
    })
})
// app.get('', (req,res)=>{
//     res.send('Hello Express!')
// })

// app.get('/help', (req,res)=>{
//     res.send([{
//         name:'Atta',
//         age:23
//     },{
//         name:'Habib',
//         age:20
//     }])
// })

// app.get('/about', (req,res)=>{
//     res.send('<h1>About Page!</h1>')
// })



app.listen(3000,()=>{
    console.log('Server is Upon port 3000')
})