import React from "react";
export default function PageTitle(props) {
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">{props.title}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
