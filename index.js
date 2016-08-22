var http = require('http');
var fs = require('fs');
var url = require('url');

function Requestcome(request, response) {
    console.log('Incoming request');

    var requestUrl = url.parse(request.url, true);
    var querystring = requestUrl.query;

    var path;
    if (requestUrl.pathname == '/') {
        path = __dirname + '/pages/index.html';
    } else {
        path = __dirname + '/pages' + requestUrl.pathname;
    }

  
    fs.readFile(path, 'utf-8', function (error, data) {

        if (error == null) {
            if ('name' in querystring && querystring.name != '') {
                data = data.replace(/\{name\}/g, '<strong>' + querystring.name + '</strong>');
            } else {
                data = data.replace(/\{name\}/g, '<strong>world</strong>');
            }

            response.write(data);
            response.end();
        }
        else if (error.code == 'ENOENT') {
            response.statusCode = 404;
            response.end();
        }
        else {
            response.statusCode = 500;
            response.write('Error reading file');
            response.end();
        }
    });
}
var myhttp = http.createServer(Requestcome);
myhttp.listen(8080);
console.log("I'm listening on port 8080 http://localhost:8080/index.html?name=tarek");