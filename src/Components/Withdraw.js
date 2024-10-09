import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import WithdrawAlert from './WithdrawAlert';

function Withdraw() {
    const location=useLocation();
    const navigate=useNavigate();
    const {id}=location.state||{};
    const [amount, setAmount]=useState(0);
    const [withdrawStatus, setWithdrawStatus]=useState("");

    const handleOnChange=(event)=>{
        setAmount(event.target.value);
    }

    const handleOnSubmit=async (event)=>{
        event.preventDefault();
        try{
            const withdrawResponse=await fetch(`http://localhost:8080/api/account/withdraw/${id}/${amount}`, {
                method: "PUT"
            });
            if(withdrawResponse.status===200){
                setWithdrawStatus(`Successful Withdrawal of \u20B9${amount}!`);
            }
            else{
                setWithdrawStatus("Withdrawal Failed!");
            }
        }catch(error){
            setWithdrawStatus("Withdrawal Failed!");
        }
    }

    const handleBackToHome=(event)=>{
        setWithdrawStatus("");
        navigate("/home");
    }

    const handleClose=(event)=>{
        setWithdrawStatus("");
    }

    return (
        <div>
            <div>
                {withdrawStatus !== "" ? (
                    <WithdrawAlert withdrawStatus={withdrawStatus} handleClose={handleClose} />
                ) : (
                    <div></div>
                )}
            </div>
            <div className="card container text-center" style={{ marginTop: "13%", width: "450px", height: "350px" }}>
                <form className='container text-center my-5' style={{ width: 400 }} onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="withdraw" className="form-label my-5"><h3>Enter Withdraw Amount</h3></label>
                        <input type="number" className="form-control" name="withdraw" value={amount} id="withdraw" onChange={handleOnChange} aria-describedby="withdrawHelp"/>
                        <button type="submit" className="btn btn-primary my-5">Withdraw</button>
                    </div>
                </form>
            </div>
            <div className="container text-center my-4">
                <button className="btn btn-primary" onClick={handleBackToHome}>Return Home</button>
            </div>
        </div>
    )
}

export default Withdraw
