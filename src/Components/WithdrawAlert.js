import React from 'react'

function WithdrawAlert(props) {
    return (
        <div>
            <div className="alert alert-danger container text-center" style={{ width: 400, marginBottom: "10%" }}>
                {props.withdrawStatus}
                <button type="button" className="btn-close mx-3" data-bs-dismiss="alert" aria-label="Close" onClick={props.handleClose}></button>
            </div>
        </div>
    )
}

export default WithdrawAlert
