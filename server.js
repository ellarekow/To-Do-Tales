const express = require(`express`);
const app = express();
// const cors = require('cors');
const path = require('path');
const PORT = process.env.port || 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
})

// app.use(cors());

// middlewear (between request and result) 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Used for css in the tutorial 
// app.use(express.static(path.join(__dirname, '/public')));


// index page
app.get('^/$|/index(.html)?', (req, res) => {
    // anon function 
    // res.sendFile('./html/index.html', { root: __dirname });

    res.sendFile(path.join(__dirname, 'html', 'index.html'));

})

app.get('/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'login.html'));

})

app.get('/signup(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'signup.html'));
})

// 404 page 
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', '404.html'));
})

// server listening for requests 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));