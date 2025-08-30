import "./login.css";
import {  NavLink,  useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [Users, setUsers] = useState({
    username: "",
    password: ""
  });

  const [Validate, setValidate] = useState({});
  const [fetch, setFetch] = useState([])
  const [error, setError] = useState('')
  const navigate=useNavigate()

  function handlechange(e) {
    setUsers((perv) => ({
      ...perv,
      [e.target.name]: e.target.value,
    }));
  }


  function validate(Users) {
    const errors = {};

    if (Users.username.length === 0)
      errors.username = "Name is required";
    if (Users.password.length === 0) errors.password = "Password is required";
    else if (Users.password.length < 6)
      errors.password = "More than 6 characters needed ";

    return errors;
  }

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then((res) => setFetch(res.data))
      .catch((err) => console.error(err))
  }, [])

  function submit(e) {
    e.preventDefault();
    const ValidateErrors = validate(Users);
    setValidate(ValidateErrors);

    if (Object.keys(ValidateErrors).length === 0){
      const userdata=fetch.find((details)=>{
        return details.username === Users.username && details.password === Users.password
      })

      if(userdata){
        localStorage.setItem('username',userdata.username)
        localStorage.setItem('age',userdata.age)
        localStorage.setItem('email',userdata.email)
        localStorage.setItem('mobile',userdata.mobile)
        localStorage.setItem('id',userdata.id)
        localStorage.setItem('role',userdata.role)

        const roles=localStorage.getItem('role')
        if(roles==='admin'){
          navigate('/admin')
        }else{
            navigate('/',{replace:true})
          window.location.reload()
        }
        
      }else{
        setError('User not found')
      }
    }
  }

  return (
    <div className="main-login-container">
      <div className="login-container">
        <div>Login</div>
        <form action="" onSubmit={submit}>
          <label>Username</label>
          <input type="text"
            name="username"
            value={Users.username}
            onChange={handlechange}
          />
          {Validate.username && <p>{Validate.username}</p>}

          <label>Password</label>
          <input type="password"
            name="password"
            value={Users.password}
            onChange={handlechange}
          />
          {Validate.password && <p>{Validate.password}</p>}

          <button type="submit">Login</button>
          {error&&<p style={{ marginTop: "8px"}}>{error}</p>}
        </form>
        <p>
          Dont have any account?
          <NavLink to={"/signup"} style={{ textDecoration: "none" }}>
            Signup
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
