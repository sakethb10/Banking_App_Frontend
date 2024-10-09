import React from 'react'

function LoginFailAlert(props) {
    return (
        <div>
            <div className="alert alert-danger container text-center" style={{width: 400, marginBottom: "10%"}}>
                INVALID CREDENTIALS!
                <button type="button" className="btn-close mx-3" data-bs-dismiss="alert" aria-label="Close" onClick={props.handleLoginFail}></button>
            </div>
        </div>
    )
}

export default LoginFailAlert
