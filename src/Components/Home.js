import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteAlert from './DeleteAlert';
import account_create_img from '../Assets/Create_Account.png';
import account_img from '../Assets/Account.png';
import deposit_img from '../Assets/deposit.png';
import withdraw_img from '../Assets/withdraw.png';
import logout_img from '../Assets/logout.png';
import delete_img from '../Assets/delete.png';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve id and name from state or localStorage
  const id = location.state?.id || JSON.parse(localStorage.getItem("id"));
  const name = location.state?.name || JSON.parse(localStorage.getItem("name"));
  const [deleteSuccess, setDeleteSuccess] = useState("");

  // Store the id and name in localStorage only if they are valid (not null/undefined)
  useEffect(() => {
    if (id && name) {
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("name", JSON.stringify(name));
    } else {
      handleUnauthorized();
    }
    // eslint-disable-next-line
  }, [id, name]);

  const handleCreate = () => {
    navigate("/home/createAccount", { state: { id } });
  }

  const handleAccountClick = () => {
    navigate("/home/account", { state: { id } });
  };

  const handleDeposit = () => {
    navigate("/home/deposit", { state: { id } });
  };

  const handleWithdrawal = () => {
    navigate("/home/withdraw", { state: { id } });
  }

  const handleLogOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    navigate("/");
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const parsedId = Number(id);
    const fetchAccountId = await fetch(`http://localhost:8080/api/account/getAccountId/${parsedId}`, {
      method: "GET"
    });
    const accountId = await fetchAccountId.text();
    try {
      const response = await fetch(`http://localhost:8080/api/account/deleteAccount/${accountId}`, {
        method: "DELETE"
      });
      if (response.status === 200) {
        setDeleteSuccess("Account Deleted!");
      }
      else {
        setDeleteSuccess("Error Deleting Or Account Doesn't Exist!");
      }
    } catch (error) {
      setDeleteSuccess("Error Deleting Or Account Doesn't Exist!");
    }
  }

  const handleUnauthorized = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    navigate("/"); // Redirect to login if not authorized
  };

  const handleAccountDelete = () => {
    setDeleteSuccess("");
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
    <div className="container">
      {deleteSuccess && <DeleteAlert deleteSuccess={deleteSuccess} handleDelete={handleAccountDelete} />}
      {id ? (
        <div>
          <h1>Welcome {name}</h1>
          <div className="container my-4">
            <div className="row">
              <div className="col-md-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={account_create_img} className="card-img-top mx-auto" alt="Couldn't Load Image..." style={{ width: "250px", height: "250px" }} />
                  <div className="card-body">
                    <button className="btn btn-primary" onClick={handleCreate}>Create Account</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={account_img} className="card-img-top mx-auto" alt="Couldn't Load Image..." style={{ width: "250px", height: "250px" }} />
                  <div className="card-body">
                    <button className="btn btn-primary" onClick={handleAccountClick}>Account Details</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={deposit_img} className="card-img-top mx-auto" alt="Couldn't Load Image..." style={{ width: "250px", height: "250px" }} />
                  <div className="card-body">
                    <button className="btn btn-primary" onClick={handleDeposit}>Deposit</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={withdraw_img} className="card-img-top mx-auto" alt="Couldn't Load Image..." style={{ width: "250px", height: "250px" }} />
                  <div className="card-body">
                    <button className="btn btn-primary" onClick={handleWithdrawal}>Withdraw</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={logout_img} className="card-img-top mx-auto" alt="Couldn't Load Image..." style={{ width: "250px", height: "250px" }} />
                  <div className="card-body">
                    <button className="btn btn-primary" onClick={handleLogOut}>Logout</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={delete_img} className="card-img-top mx-auto" alt="Couldn't Load Image..." style={{ width: "250px", height: "250px" }} />
                  <div className="card-body">
                    <button className="btn btn-primary" onClick={handleDelete}>Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card container text-center">
          <div className="card-body">
            <h4>You Are Not Logged In</h4>
            <button className="btn btn-primary" onClick={handleUnauthorized}>Please Login</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
