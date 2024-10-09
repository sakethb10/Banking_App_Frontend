import React from 'react'

function CreationAlert(props) {
    return (
        <div>
            <div className="alert alert-danger container text-center" style={{ width: 400, marginBottom: "10%" }}>
                {props.creationStatus}
                <button type="button" className="btn-close mx-3" data-bs-dismiss="alert" aria-label="Close" onClick={props.handleCreationFail}></button>
            </div>
        </div>
    )
}

export default CreationAlert
