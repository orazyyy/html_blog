//创建服务器
//加载http核心模块
const http = require('http');
let fs = require('fs');
//创建web服务器
const server = http.createServer();
server.on('request', (req, res)=>{
    /** 
     res.setHeader('Content-Type', 'application/json');
    const responseData = {
        name: 'Yang',
        uni: 'hhu'
    }

    res.end(JSON.stringify(responseData));*/
    let url = req.url;
    if (url==='/') {
        
        fs.readFile('index.html', function (err, data) {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end('文件读取失败');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                
                res.end(data);
            }
        });
        //res.end('index page');
    }else if(url ==='/login'){
        res.end('login page');
    }else{
        res.end('something else');
    }

    
});

const PORT = 5000;


server.listen(PORT, function (){
    console.log('server running at port 5000...');
});