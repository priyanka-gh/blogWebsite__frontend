import './Signup.css'
import FloatingLabel from "react-bootstrap-floating-label";
import React,{useState} from 'react'
import {signup} from '../index'
import {Link} from 'react-router-dom'

const Signup = () => {
    
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });
    
    const { name, email, password, error, success } = values;
  
      
    const handleChange = name => event => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };
  
    const onSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: false });
      signup({ name, email, password })
        .then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false });
          } else {
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              error: "",
              success: true
            });
            window.location.reload(); 
          }
        })
        .catch(console.log("Error in signup"));
    };
    
    const successMessage = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-success"
              style={{ display: success ? "" : "none" }}
            >
              New account was created successfully. Please
              <Link to="/login"> Login Here</Link>
            </div>
          </div>
        </div>
      );
    };
  
    const errorMessage = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>
          </div>
        </div>
      );
    };
   
    return (
        <div className="signUpDiv">
            <div className="signupCard">
                <h1 className="h1Signup">Welcome</h1>
                {errorMessage()}
                <div className="innerSignupDiv">
                    <FloatingLabel className="signupName" 
                        label="Name" 
                        onChange={handleChange("name")} 
                        type="text" 
                        value={name}/>
                    <FloatingLabel className="signupEmail" 
                        label="Email" 
                        onChange={handleChange("email")} 
                        value={email} 
                        type="email"/>
                    <FloatingLabel className="signupPassword" 
                        label="Password"
                        onChange={handleChange("password")} 
                        value={password} 
                        type="password"/>
                </div>
                <button className="signupBtn" type="submit" onClick={onSubmit}>SIGNUP</button>
                <a href="/login" className="signupHere">Already have an account? Login here</a>
            {successMessage()}
            </div>
        </div>
    )
}

export default Signup
