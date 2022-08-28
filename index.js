const axios = require("axios").default
const fs = require('fs');
const http = require('http');

let filter = 64
let content='';
axios.get('https://coderbyte.com/api/challenges/json/age-counting')
.then(data =>{
    let ages = JSON.stringify(data.data.data).replace(/(\s|\")*/gi,'').split(',')
    ages = ages.reverse()
    for (let i=0; i < ages.length; i+=2) {
        let result = ages[i].split('=')
        if(result[1]>=filter) content += "<p>"+ages[i]+" - "+ages[i+1]+"</p>"
    }
    fs.writeFile('resultado.html',content,(err)=>{
        if(err) throw err
        console.log('File Saved')
    })
    
    http.createServer((req, res)=>{
        console.log('http://localhost:8080/')
        fs.readFile("resultado.html",(err,file)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(file);
            return res.end()
        });
    }).listen(8080)
})
.catch(error =>{
    throw error
})
