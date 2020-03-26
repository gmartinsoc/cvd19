// EXPRESS
const app = require('../src/app');


// ENV
const port = normalizaPort(process.env.PORT || '3000');

// Helper function to validade port number
function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

// Start service
app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})