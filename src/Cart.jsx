import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeCart } from './CartSlice';
import { toast, ToastContainer } from 'react-toastify';
import { applyCoupon, resetCoupon } from './CuponSlice';
import 'react-toastify/dist/ReactToastify.css';

import emailjs from "@emailjs/browser";

import { QRCode } from 'react-qr-code';
import { addOrder } from './OrdersSlice';


function Cart() {

    // Hook to dispath the action to store. 
    let dispatch = useDispatch();

    // Get cart items from Redux
    const cartItems = useSelector(globalState => globalState.cart);

    // Total cart amount
    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Manual discount state (button discount)
    const [manualDiscount, setManualDiscount] = useState(0);


    // Manual discount amount
    const manualDiscountAmount = (totalAmount * manualDiscount) / 100;

    // Coupon input state to store the cupon Name
    const [input, setInput] = useState("");

    // Get coupon data from Redux
    let { code, discount, applied, message } = useSelector(globalState => globalState.cupon);

    // Coupon discount amount
    const couponDiscountAmount = applied ? (totalAmount * discount) / 100 : 0;

    // Amount after both discounts
    const amountAfterDiscounts = totalAmount - manualDiscountAmount - couponDiscountAmount;

    // GST calculation (18%)
    const gst = amountAfterDiscounts * 0.18;

    // Final amount after discounts + GST
    const finalAmount = amountAfterDiscounts + gst;

    // Render cart items
    let listItems = cartItems.map(item => (
        <li key={item.id}>
            {item.name} {item.quantity} ₹{item.price}
            <button
                onClick={() => {
                    dispatch(removeCart(item));
                    toast.error("Product " + item.name + " removed");
                    if (cartItems.length === 1) {
                        dispatch(resetCoupon());
                    }
                }}
                style={{ background: 'red', padding: '10px', margin: '10px' }}
            >
                Remove
            </button>
        </li>
    ))

    let [checkout, setCheckout] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState('');

    const [customerEmail, setCustomerEmail] = useState('');

    // mapping the template varaibles to Project product variables   
    let templateParams = {
        order_id: 'ORD123',
        orders: cartItems.map(item => ({
            name: item.name,
            price: (item.price * item.quantity).toFixed(2),
            units: item.quantity
        })),
        cost: {
            shipping: 50,
            tax: gst.toFixed(2),
            total: finalAmount.toFixed(2)
        },
        email: customerEmail
    }

    let purchaseDetails = {
        date: new Date().toLocaleString(),
        items: [...cartItems],
        totalPrice: finalAmount,
    };

    let handleCheckoutEmail = () => {
        emailjs.send("service_cg9atjs", "template_mnhcctp", templateParams, "KqS4enM6yf4hrGvkl")
            .then(() => { console.log("✅ Email sent successfully"); })
            .catch((error) => { console.log("❌ Email sending failed:", error); });
        dispatch(addOrder(purchaseDetails));
        dispatch(clearCart());
    }


    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            <button onClick={() => { dispatch(clearCart()); dispatch(resetCoupon()) }}>
                Clear Cart
            </button>

            {cartItems.length === 0 ? <p>The Cart is Empty </p> :
                <div>
                    <ol>{listItems}</ol>

                    <h1>Total Amount: ₹{totalAmount.toFixed(2)}</h1>

                    {/* Manual Discount Buttons */}
                    <div style={{ marginBottom: "10px" }}>
                        <button onClick={() => setManualDiscount(10)}>
                            10% Discount
                        </button>

                        <button
                            onClick={() => setManualDiscount(20)}
                            style={{ marginLeft: "10px" }}
                        >
                            20% Discount
                        </button>

                        <button
                            onClick={() => setManualDiscount(30)}
                            style={{ marginLeft: "10px" }}
                        >
                            30% Discount
                        </button>
                    </div>
                    {manualDiscount > 0 && <p> Discount percentage {manualDiscount} Applied : {manualDiscountAmount}</p>}

                    {/* Coupon Input */}
                    <input
                        type="text"
                        placeholder="Enter coupon"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button onClick={() => dispatch(applyCoupon(input))}>
                        Apply Coupon
                    </button>

                    {/* Show Message Properly */}
                    {message && (
                        <p style={{ color: applied ? "green" : "red" }}>
                            {message}
                        </p>
                    )}

                    {/* Show Discount Only If Applied */}
                    {applied && (
                        <h3 style={{ marginTop: "15px" }}>
                            Cupon Discount ({discount}%): ₹{couponDiscountAmount.toFixed(2)}
                        </h3>
                    )}

                    <h3>GST (18%): ₹{gst.toFixed(2)}</h3>

                    <h2>Final Amount: ₹{finalAmount.toFixed(2)}</h2>


                    <div>
                        <label> 📧 Enter your Gmail to receive order confirmation </label>
                        <input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>



                    <button onClick={() => setCheckout(true)}>
                        Show Payment
                    </button>

                    {
                        checkout &&
                        <div>
                            <h3>💳 Select Payment Method:</h3>
                            <button onClick={() => setPaymentMethod("qr")}>📱 QR Code</button>
                            <button onClick={() => setPaymentMethod("card")}>💳 Card</button>
                        </div>
                    }

                    {paymentMethod === 'qr' && (
                        <div>
                            <h4>Scan UPI QR to Pay ₹{finalAmount.toFixed(2)}</h4>
                            <QRCode value={`upi://pay?pa=mounikasaikarri@ybl&pn=MounikaStore&am=${finalAmount.toFixed(2)}&cu=INR`} />

                        </div>
                    )}


                    {paymentMethod === 'card' && <h1>"This Card services are not Available"</h1>}


                    <button onClick={handleCheckoutEmail}> Place Order</button>
                </div>
            }
        </>
    )
}

export default Cart;