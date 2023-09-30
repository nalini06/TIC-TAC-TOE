const express = require('express')
const cors = require('cors')
const authRouter = require('../routes/auth')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/tic-tac-toe/api', authRouter)


app.listen(3001, () =>{
    console.log("Server is running on port 3001");
})


