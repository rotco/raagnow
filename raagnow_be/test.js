const fs = require('fs')
const http = require('http')

const server = http.createServer((req,res)=>{
    console.log('request made');
    console.log('req',req.url);
    res.setHeader('Content-Type','text/html');
    let filename = ""
    switch (req.url){
        case "/":
            filename = "./index.html";
            res.statusCode = 200;
            break;
        case "/about":
            filename = "./about.html";
            res.statusCode = 200;
            break;
        
        case "/about-us":
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end()
            break;
        default:
            filename = "./404.html";
            res.statusCode = 404;
            break;
    }
    fs.readFile(filename,{encoding: 'utf-8'},(err,data)=>{
        if (err) {
            console.log(err);
        }

        res.end(data)
    })

})

server.listen(3000, 'localhost',()=>{
    console.log('listening to requests on port 3000')
})