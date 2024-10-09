import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginFailAlert from './LoginFailAlert';
import bank_logo from '../Assets/bank_logo.png'

function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loginFailed, setLoginFailed] = useState(false);
    let navigate = useNavigate();
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/api/customer/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const result = await response.json();
        if (result.Result === "Success") {
            navigate('/home', { state: { id: result.Id, name: result.Name } });
        }
        else {
            setLoginFailed(true);
        }
    }
    const handleOnChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    const handleSignup = (event) => {
        navigate('/signup');
    }
    const handleLoginFail = () => {
        if (loginFailed) {
            setLoginFailed(false);
        }
    }
    return (
        <div className='container text-center my-5'>
            <div>
                {loginFailed && <LoginFailAlert handleLoginFail={handleLoginFail} />}
            </div>
            <div className="container text-center" style={{marginTop: "10%"}}>
                <h1>Welcome to Online Bank</h1>
                <img src={bank_logo} alt="Couldn't Load Image..." style={{height: "150px", width: "150px"}}/>
            </div>
            <div>
                <form className='container text-center my-5' style={{ width: 400 }} onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} id="email" onChange={handleOnChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} id="password" onChange={handleOnChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-primary mx-2" onClick={handleSignup}>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Login
