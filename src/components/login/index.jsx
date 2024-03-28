import React , {useState} from "react";
import loginService from '../../services/login'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const handleLogin = async(e) => {
    e.preventDefault()
    console.log('submited')
    

    try {
        const user = await loginService.login({username, password})
    setUser(user)
    setUsername('')
    setPassword('')
    } catch (error) {
        console.log(error)
    }
  };
console.log(user)
  return (
    <form onSubmit={handleLogin}>
      <h1>Log In to Application</h1>
      <label htmlFor="username">
        <span>username </span>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <br />
      <label htmlFor="password">
        <span>password </span>
        <input
          type="password"
          id="password"
          password="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
