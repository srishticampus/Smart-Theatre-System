import React from 'react'
import "../../Assets/Styles/UserParkingPayment.css"


function UserParkingPayment() {
    return (
        <div>
            <div className='d-flex justify-content-center'>
                <div className='user-parking-payment-allhead'>
                    <p className='user-parking-payment-head'>Payment</p>
                    <p className='user-parking-payment-headtwo'>Car Parking <span className='user-parking-payment-headtwo-sub'>(D-9)</span></p>
                    <p className='user-parking-payment-headthree'>Payable Amount <span className='user-parking-payment-headthree-sub'>&#8377;50/-</span></p>
                </div>
            </div>
            <div>
                <div className='d-flex justify-content-center'>
                    <div className="card user-parking-ticket-cardtwo">
                        <div className='d-flex justify-content-center user-parking-ticket-payment-heading'>
                            <p className='parking-payment-details-style'>Payment Details</p>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center mt-4">
                                <div className="col-sm-6">
                                    <div className="form-group" >

                                        <label htmlFor="creditCardNumber">Credit Card Number</label>
                                        <input
                                            type="text"
                                            className="form-control parking-payment-card-number"
                                            id="creditCardNumber"
                                            placeholder="Enter Credit Card Number"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group ">
                                        <label htmlFor="expiryDate">Expiry Date</label>
                                        <input
                                            type="text"
                                            className="form-control parking-payment-expiry-date"
                                            id="expiryDate"
                                            placeholder="Enter MM/YY"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="row justify-content-center mt-4">
                                <div className="col-sm-6">
                                    <div className="form-group" >

                                        <label htmlFor="creditCardNumber">CVV Code</label>
                                        <input
                                            type="text"
                                            className="form-control parking-payment-cvv-code"
                                            id="creditCardNumber"
                                            placeholder="Enter CVV Code"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="expiryDate">Name On Credit Card</label>
                                        <input
                                            type="text"
                                            className="form-control  parking-payment-name-on-card"
                                            id="expiryDate"
                                            placeholder="Enter Name On Card"
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                     

                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-3'>
            <button className='btn btn-danger'>Pay &#8377;50/-</button>
            </div>

        </div>
    )
}

export default UserParkingPayment
