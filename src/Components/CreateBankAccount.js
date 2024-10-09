import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CreationAlert from './CreationAlert';

function CreateBankAccount() {
    const location=useLocation();
    const navigate=useNavigate();
    const {id}=location.state||{};
    const [balance, setBalance]=useState(0);
    const [creationStatus, setCreationStatus]=useState("");

    /*
    useEffect(() => {
        if (cid) {
          localStorage.setItem("cid", JSON.stringify(cid));
        }
        // eslint-disable-next-line
      }, [cid]);
    */  

    const handleOnChange=(event)=>{
        setBalance((event.target.value));
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/account/createAccount`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "customer": {
                        "id": id
                    },
                    "balance": Number(balance)
                })
            });
            if (response.status === 201) {
                setCreationStatus("New Account Opened!");
            } else {
                setCreationStatus("Failed To Create Or Account Already Exists!");
            }
        } catch (error) {
            setCreationStatus("Failed To Create Or Account Already Exists!");
        }
    }
    
    const handleCreationFail=(event)=>{
        setCreationStatus("");
    }

    const handleHome=(event)=>{
        setCreationStatus("");
        //localStorage.removeItem("cid");
        navigate("/home");
    }

    useEffect(() => {
        const disableBackButton = () => {
          window.history.pushState(null, "", window.location.href);
          window.onpopstate = () => {
            window.history.go(1);
          };
        };
    
        disableBackButton();
        return () => {
          window.onpopstate = null;
        };
      }, []);

    return (
        <div className="container text-center my-5">
            <div>
                {creationStatus && <CreationAlert creationStatus={creationStatus} handleCreationFail={handleCreationFail} />}
            </div>
            <div style={{ marginTop: '15%' }}>
                <h1>Open New Account</h1>
                <form className='container text-center my-5' style={{ width: 400 }} onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="balance" className="form-label">Set Balance</label>
                        <input type="number" className="form-control" name="balance" value={balance} id="balance" onChange={handleOnChange} aria-describedby="createHelp"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleHome}>Home</button>
            </div>
        </div>
    )
}

export default CreateBankAccount
