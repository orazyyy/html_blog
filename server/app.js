//创建服务器
//加载http核心模块
const koa = require('koa');
const router = require('koa-router')();
const koaStatic = require('koa-static');
let fs = require('fs');
const path = require('path');
const app = new koa();


/*
创建web服务器
const server = http.createServer();
server.on('request', (req, res)=>{
    
     res.setHeader('Content-Type', 'application/json');
    const responseData = {
        name: 'Yang',
        uni: 'hhu'
    }

    res.end(JSON.stringify(responseData));
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
        res.end('index page');
    }else if(url ==='/login'){
        res.end('login page');
    }else{
        res.end('something else');
    }

    
});
*/
//static resources like css-sheets
app.use(koaStatic('./static'));

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

router.get('/', async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./static/index.html');
});

router.get('/my_blogs.html', async (ctx, next) => {
    //var name = ctx.params.name;
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./static/my_blogs.html');
});
router.get('/my_photos.html', async (ctx, next) => {
    //var name = ctx.params.name;
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./static/my_photos.html');
});


app.use(router.routes());
app.listen(3001);
console.log('server running at port 3001...');
