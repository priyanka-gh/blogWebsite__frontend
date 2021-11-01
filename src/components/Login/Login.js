import React,{useState} from 'react'
import './Login.css'
import FloatingLabel from "react-bootstrap-floating-label";
import {signin,authenticate,isAuthenticated} from '../index'
import {Redirect} from 'react-router-dom'

const Login = () => {
    
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        didRedirect: false
    });

    const { email, password, error, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signin({ email, password })
        .then(data => {
            if (data.error) {
            setValues({ ...values, error: data.error });
            } else {
            authenticate(data, () => {
                setValues({
                ...values,
                didRedirect: true
                });
            });
            window.location.reload(); 
            }
        })
        .catch(console.log("signin request failed"));
    };


    const performRedirect = () => {
        //TODO: do a redirect here
    if (didRedirect) {
        if (user && user.role === 1) {
            return <Redirect to="/admin/dashboard"/>;
        } else {
            return <Redirect to="/"/>;
        }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
          }
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
        <div className="loginDiv">
            <div className="loginCard">
            {errorMessage()}
                <h1 className="h1login">Welcome</h1>
                <div className="innerloginDiv">
                    <FloatingLabel className="loginEmail" 
                        label="Email" 
                        onChange={handleChange("email")} 
                        value={email} />
                    <FloatingLabel className="loginPassword" 
                        type="password"
                        label="Password"
                        onChange={handleChange("password")} 
                        value={password} />
                </div>
                <button className="loginBtn" type="submit" onClick={onSubmit}>LOGIN</button>
                <a href="/signup" className="loginHere">Don't have an account yet? Signup here</a>
            </div>
            {performRedirect()}
        </div>
    )
}

export default Login
