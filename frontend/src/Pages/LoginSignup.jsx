import { useState } from "react"
import "./CSS/Loginsignup.css"

function LoginSignup() {

  const [state, setState] = useState('Login');
  const [formData, setFormDate] = useState({
    username: "",
    password: "",
    email: "",
  })

  const changeHandler = (e) => {
    setFormDate({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log("Login Function", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }

    else {
      alert(responseData.errors)
    }
  }
  const signup = async () => {
    console.log("Signup Function", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }

    else {
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && <input type="text" name="username" value={formData.username} onChange={changeHandler} placeholder='Your Name' id="" />}
          <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder='Your Email' id="" />
          <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder='Password' id="" />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        <div className="loginsignup-login">
          {
            state === "Sign Up" ?
              <p> Already have an account? <span onClick={() => setState("Login")}>Login here</span></p> :
              <p> Create an account? <span onClick={() => setState("Sign Up")}>Click here</span></p>
          }
        </div>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
