const fs = require('fs');
const server = require('http').createServer();




server.on('request', (req,res) => {
     //solution 1 has to load whole file to memory
    //  fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    //  });

    // const readable = fs.createReadStream('test-file.txt')  
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // });
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on('error', err => {
    //     console.log(error);
    //     res.statusCode(500);
    //     res.end('File Not Found');
    // })
    //solution 3

    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res);
    // readable source can be piped to a writeable stream i.e the response.
});



server.listen(8000, '127.0.0.1', () => {
    console.log('listening')
})