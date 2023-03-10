const bcrypt = require("bcrypt");
const db = require("./db.js");
const { app } = require("./server.js");

app.post("/registration", async (req, res) =>{
    const {username, email, password} = req.body;
    try {
        const hash = bcrypt.hashSync(password, saltRounds);
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash]);    
    } catch (error) {
        if (error.code  == "ER_DUP_ENTRY"){
            if (error.message.includes("username") == true){
                return res.json({message: "Username already in use.", code: 0});
            }else {
                return res.json({message: "Email already in use.", code: 0});
            }
        } else {
            throw error;
        }
    }  

    return res.json({message: "Registration successful.", code: 1});

});

app.post("/login", async (req, res) =>{
    const {email, password} = req.body;
    const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    //console.log(result[0].password);
    if(result.length > 0){
        const hash = result[0].password;
        if (bcrypt.compareSync(password, hash) == true){
            res.json({message: "Login successful", code : 1});
        }
        res.json({message: "zashto raboti", code : 0});
    }
});

app.get("/user/:userid", async (req, res) => {
    const result = await db.query('SELECT * FROM users WHERE id = ?', [req.params.userid]);
    res.json({result});   
});
