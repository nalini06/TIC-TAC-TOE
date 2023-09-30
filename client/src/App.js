
import Login from './components/Login';
import SignUp from './components/SignUp';
import {StreamChat}  from 'stream-chat';
import Cookies from 'universal-cookie'



function App() {

const apiKey = "q27f967ye3cx"
const apiSecret= "43b8veanaww5g6ufkzp4t8x6638qvx6pufyaf8n7c7vx834h8m9mkse6b62ygbn8"
const cookies = new Cookies();
const client =  StreamChat.getInstance(apiKey);
const token = cookies.get("token");
console.log("log"+token);
 if(token){
  client.connectUser( {
    id: cookies.get("userId"),
    name: cookies.get("userName"),
    firstName: cookies.get("firstName"),
    lastName: cookies.get("lastName"),
    hashedPassword: cookies.get("hashedPassword")

  }, token)
  .then((user) =>{
    console.log(user);
  })
 }

  return (
    <div className="App">
       <SignUp/>
       <Login/>
    </div>
  );
}

export default App;
