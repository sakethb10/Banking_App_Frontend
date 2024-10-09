import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [credentials, setCredentials] = useState({ name: "", dob: "", email: "", password: "", repeatPassword: "", address: { strAddress: "", city: "", state: "", zip: "", country: "" } });
    let navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/api/customer/createProfile", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                dob: credentials.dob,
                address: credentials.address
            })
        });
        const result = response.status;
        if (result === 201) {
            navigate("/");
        }
        else {
            alert("Error Creating Profile");
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (["strAddress", "city", "state", "zip", "country"].includes(name)) {
            setCredentials({
                ...credentials,
                address: { ...credentials.address, [name]: value } // Properly updating nested address object
            });
        } else {
            setCredentials({ ...credentials, [name]: value }); // Update for other fields
        }
    }
    const validate=()=>{ 
        const validateEmail=()=>{
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(credentials.email).toLowerCase());
        }
        const validatePassword=()=>{
            return credentials.password===credentials.repeatPassword;
        }
        return credentials.name!=null&&credentials.dob!=null&&credentials.email!=null&&credentials.address.strAddress!=null&&credentials.address.strAddress&&credentials.address.strAddress&&credentials.address.strAddress&&credentials.address.strAddress&&credentials.password&&credentials.repeatPassword&&validateEmail()&&validatePassword();
    }
    return (
        <div>
            <div className="container" style={{ marginTop: '5%' }}>
                <h2 className="my-4">Enter Details</h2>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" name="name" value={credentials.name} id="name" onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="dob" className="form-label">Dob</label>
                        <input type="text" className="form-control" name="dob" value={credentials.dob} id="dob" onChange={handleChange} placeholder="dd/mm/yyyy" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} id="email" onChange={handleChange} placeholder="abc@xyz.com" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="strAddress" className="form-label">Street Address</label>
                        <input type="text" className="form-control" name="strAddress" value={credentials.address.strAddress} id="strAddress" placeholder="1234 Main St" onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" name="city" value={credentials.address.city} id="city" onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" className="form-control" name="state" value={credentials.address.state} id="state" onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="zip" className="form-label">Zip</label>
                        <input type="text" className="form-control" name="zip" value={credentials.address.zip} id="zip" onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input type="text" className="form-control" name="country" value={credentials.address.country} id="country" onChange={handleChange} />
                    </div>
                    <div className="container text-center my-4" style={{marginLeft: "25%"}}>
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" value={credentials.password} id="password" onChange={handleChange} />
                        </div>
                        <div className="col-md-6 my-2">
                            <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
                            <input type="password" className="form-control" name="repeatPassword" value={credentials.repeatPassword} id="repeatPassword" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-12">
                        <button disabled={!validate()} type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
