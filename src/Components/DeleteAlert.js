import React from 'react'

function DeleteAlert(props) {
    return (
        <div>
            <div className="alert alert-danger container text-center" style={{ width: 400, marginBottom: "10%" }}>
                {props.deleteSuccess}
                <button type="button" className="btn-close mx-3" data-bs-dismiss="alert" aria-label="Close" onClick={props.handleAccountDelete}></button>
            </div>
        </div>
    )
}

export default DeleteAlert
