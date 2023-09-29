import React from 'react'

const AdminCard = ({ count, widgetname, icon }) => {
    return (
        <>
        <div className="card shadow mb-2" >
            <div className="card-body">
                <div className="d-flex">
                    <div className='w-100'>
                        <h4 className="card-title">{count}</h4>
                        <p className='card-text'>{widgetname}</p>
                    </div>
                    <div className='w-100 d-flex justify-content-center align-items-center'>
                        {icon}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminCard