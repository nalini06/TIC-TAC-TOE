
const {v4} = require('uuid')
const bcrypt = require('bcrypt')
const {StreamChat} = require('stream-chat')

const apiKey = "q27f967ye3cx"
const apiSecret= "43b8veanaww5g6ufkzp4t8x6638qvx6pufyaf8n7c7vx834h8m9mkse6b62ygbn8"

const serverClient =  StreamChat.getInstance(apiKey, apiSecret);


exports.signup = async(req, res)=>{
    try{
        const {firstName, lastName, username, password} = req.body
        const userId = v4();
        const hashedPassword  = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({token, userId, firstName, lastName, username, hashedPassword});
    }catch(error){
        res.json(error);
    }
   
}

exports.login = async(req, res) =>{
    try{
        const{username, password} = req.body;
        const{users} = await serverClient.queryUsers({name: username});
        if(users.length === 0){
            return res.json({message : "User not found"})
        }
        console.log(users[0]);        
        const token = serverClient.createToken(users[0].id);
        const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);
    
        if(passwordMatch){
           res.json({
            token, 
            firstName: users[0].firstName,
            lastName: users[0].lastName,
            username,
            userId: users[0].id
        })
        }
    }catch(error){
        res.json(error)
    }
    
}