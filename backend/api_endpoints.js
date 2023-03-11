const bcrypt = require("bcrypt");
const db = require("./db.js");
const { app } = require("./server.js");
const saltRounds = 10;
const cookieParser = require("cookie-parser");
app.use(cookieParser());

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
    return res.json({code: 1});

});

app.post("/login", async (req, res) =>{
    const {email, password} = req.body;
    const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if(result.length > 0){
        const hash = result[0].password;
        if (bcrypt.compareSync(password, hash) == true){
            await db.query('INSERT INTO user_sessions (user_id) VALUES (?)', [result[0].id]);
            const token_result = await db.query('SELECT token FROM user_sessions WHERE id = LAST_INSERT_ID()');
            const token = token_result[0].token;
            res.cookie('token', token);
            res.json ({message: "Login successful", code : 1});

        }
    }
});

app.get("/user", async (req, res) => {
    if (req.cookies) {
        const CookieResult = await db.query(`SELECT users.username, users.email
                        FROM users 
                            JOIN user_sessions ON users.id=user_sessions.user_id
                        WHERE token = ?`, [req.cookies.token]);
        res.json({CookieResult});
    }
    console.log(req.cookies)
    const result = await db.query('SELECT * FROM users WHERE id = ?', [req.params.userid]);
    res.json({result});   
});