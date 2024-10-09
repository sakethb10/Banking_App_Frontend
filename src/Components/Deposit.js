import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DepositAlert from './DepositAlert';

function Deposit() {
    const location = useLocation();
    const { id } = location.state || {}; // Get the account ID from the location state
    const [amount, setAmount] = useState(0);
    const [depositStatus, setDepositStatus]=useState("");
    const navigate = useNavigate();

    const handleOnChange = (event) => {
        setAmount(event.target.value); // Update the amount based on user input
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch(`http://localhost:8080/api/account/deposit/${id}/${amount}`, {
                method: "PUT" 
            });

            if (response.status === 200) {
                setDepositStatus("Deposit Successful");
            } else {
                setDepositStatus("Deposit Failed");
            }
        } catch (error) {
            setDepositStatus("Deposit Failed");
        }
    }

    const handleBackToHome = (event) => {
        setDepositStatus("");
        navigate("/home");
    }

    const handleClose=(event)=>{
        setDepositStatus("");
    }

    return (
        <div>
            <div>
                {depositStatus!==""?(
                    <DepositAlert depositStatus={depositStatus} handleClose={handleClose}/>
                ):(
                    <div></div>
                )}
            </div>
            <div className="card container text-center" style={{marginTop: "13%", width: "450px", height: "350px"}}>
                <form className='container text-center my-5' style={{ width: 400 }} onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="deposit" className="form-label my-5"><h3>Enter Deposit Amount</h3></label>
                        <input type="number" className="form-control" name="deposit" value={amount} id="deposit" onChange={handleOnChange} aria-describedby="depositHelp"/>
                        <button type="submit" className="btn btn-primary my-5">Deposit</button>
                    </div>
                </form>
            </div>
            <div className="container text-center my-4">
                <button className="btn btn-primary" onClick={handleBackToHome}>Return Home</button>
            </div>
        </div>
    )
}

export default Deposit;
