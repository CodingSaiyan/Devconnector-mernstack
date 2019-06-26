var express = require("express"),
    app = express(),
    connectDB = require("./config/db");

    connectDB();
    
    // INIT MIDDLEWARE and this replaces bodyParser.json 
    //Body parser is now part of express
    app.use(express.json({extended: false }));

    app.get("/", (req, res) => res.send("API Running"));
    
    //Define Routes
    app.use("/api/users", require('./routes/api/users'));
    app.use("/api/auth", require('./routes/api/auth'));
    app.use("/api/profile", require('./routes/api/profile'));
    app.use("/api/posts", require('./routes/api/posts'));


    
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {console.log(`Socializing at ${PORT} MPH!!`)});
