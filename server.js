const app = require("express")();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(8888, "localhost", () => console.log("服务已经启动"));
io.on('connection', function (socket) {
    let news = [];
    for (var i = 1; i <= 200; i++) {
        news.push({ id: i, value: Number(String(Math.random()).substring(2, 12)).toString(26) });
    }    
    console.log('已联通');
    socket.on('getNews', options => {
        let { start: m, end: n } = options;
        socket.emit('news', { data: news.slice(m, n), total: news.length });
    });
    let timer = setInterval(() => {
        let len = news.length;
        if (news.length >= 250) {
            clearInterval(timer);
        } else {
            for (var i = news.length + 1; i <= len + 10; i++) {
                news.push({ id: i, value: Number(String(Math.random()).substring(2, 12)).toString(36) });
            }
            socket.emit('update', { data: news, total: news.length });
        }
    }, 10000);
});
