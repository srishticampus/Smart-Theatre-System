import React from 'react'
import "../../Assets/Styles/UserBookTicketPayment.css"


function UserBookTicketsPayment() {
    return (
        <div>
            <div className='user-ticket-payment-head-container'>
                <p className='user-ticket-payment-head '>Payment</p>
            </div>
            <div className='d-flex justify-content-evenly'>
                <div className="card user-ticket-paymnet-card">
                    <p className='user-ticket-payment-card-header'>Demonte Colony 2</p>
                    <p className='user-ticket-payment-card-para'>Horror,Comedy | Tamil</p>
                    <p className='user-ticket-payment-card-paratwo'>Maxus Cinemas | Tuesday, November, 7:00 AM</p>
                </div>
                <div className='card user-ticket-payment-cardtwo'>
                    <div className='d-flex justify-content-between'>
                        <p className='user-ticket-payment-seat'>Seat - A1,A2 <span className='user-ticket-payment-seat-sub'>(2 Tickets)</span></p>
                        <p className='user-ticket-payment-payone'>&#8377;260/-</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p className='user-ticket-payment-parafees'>Convenience fees</p>
                        <p className='user-ticket-payment-paytwo'>&#8377;60/- </p>
                    </div>
                    <hr></hr>
                    <div className='d-flex justify-content-between'>
                        <p className='user-ticket-payment-total'>Total</p>
                        <p className='user-ticket-payment-total-amount'>&#8377;320/-</p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <div className="card user-book-ticket-cardtwo">
                    <div className='d-flex justify-content-center user-book-ticket-payment-heading'>
                        <p className='payment-details-style'>Payment Details</p>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center mt-4">
                            <div className="col-sm-6">
                            <div className="form-group" >

                                    <label htmlFor="creditCardNumber">Credit Card Number</label>
                                    <input
                                        type="text"
                                        className="form-control payment-card-number"
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
                                        className="form-control payment-expiry-date"
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
                                        className="form-control payment-cvv-code"
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
                                        className="form-control  payment-name-on-card"
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
    )
}

export default UserBookTicketsPayment
