import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FetchFail from './FetchFail';

function Account() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};  // Get the id passed from Home
  const storedAccountInfo = JSON.parse(localStorage.getItem("accountInfo")) || {
    AccountId: -1,
    CustomerId: -1,
    Account_Balance: -1,
    Name: ""
  };

  const [accountInfo, setAccountInfo]=useState(storedAccountInfo);
  const [fetchFail, setFetchFail] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:8080/api/account/getAccount?id=${id}`);
          const result = await response.json();
          setAccountInfo(result);
          localStorage.setItem("accountInfo", JSON.stringify(result));
        } catch (error) {
          setFetchFail(true);
        }
      } else {
        setFetchFail(true);
      }
    };
    if(!storedAccountInfo||storedAccountInfo.CustomerId===-1){
      fetchAccount();
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    const disableBackButton = () => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = (event) => {
        window.history.go(1);
      };
    };
  
    disableBackButton();
    return () => {
      window.onpopstate = null;
    };
  }, []);
  

  const handleHome = (event) => {
    localStorage.removeItem("accountInfo");
    navigate("/home");
  }

  const handleFetchFail=(event)=>{
    if(fetchFail){
      setFetchFail(false);
    }
  }

  const handleUnauthorized=(event)=>{
    localStorage.removeItem("accountInfo");
    navigate("/home");
  }

  return (
    <div>
      {fetchFail && <FetchFail handleFetchFail={handleFetchFail} />}
      
      <h1 style={{ marginTop: "10%" }}>Account Details</h1>

      {/* Render account details or unauthorized access button */}
      {accountInfo.CustomerId !== -1 ? (
        <div className="card container text-center" style={{ width: 350, marginTop: "5%" }}>
          <div className="card-body container text-center my-4">
            <h1 className="card-title">{accountInfo.Name}</h1>
            <p className="my-3">Account ID: {accountInfo.AccountId}</p>
            <p>Account Balance: {accountInfo.Account_Balance}</p>
            <p>Customer ID: {accountInfo.CustomerId}</p>
            <button className="btn btn-primary" onClick={handleHome}>Back To Home</button>
          </div>
        </div>
      ) : (
        <div className="card container text-center">
          <div className="card-body">
            <button type="button" className="btn btn-primary" onClick={handleUnauthorized}>Return Home</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
