import React from 'react'

function FetchFail(props) {
    return (
        <div>
            <div className="alert alert-danger container text-center" style={{width: 500, marginBottom: "10%"}}>
                Error Fetching Info...
                Please Create Account Or Try Again!
                <button type="button" className="btn-close mx-3" data-bs-dismiss="alert" aria-label="Close" onClick={props.handleFetchFail}></button>
            </div>
        </div>
    )
}

export default FetchFail
