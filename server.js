var express = require("express"),
    app = express();

    
    app.get("/", (req, res) => res.send("API Running"));
    
    const PORT = process.env.PORT || 5000;


    app.listen(PORT, () => {console.log(`Socializing at ${PORT} MPH!!`)});
