import { useDispatch } from 'react-redux';
import './Veg.css'
import { addToCart } from './CartSlice';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function Veg() {
    const vegItems = [
        {
            id: 1,
            name: "Paneer Tikka",
            price: 1,
            imagelocation: "./beans.jpg"
        },
        {
            id: 2,
            name: "Veg Biryani",
            price: 180,
            imagelocation: "./bottle.jpg"
        },
        {
            id: 3,
            name: "Mixed Veg Curry",
            price: 150,
            imagelocation: "bitter.jpg"
        }
    ];

    let disptach = useDispatch();

    //Conver the Array of elements 
    const vegListItems = vegItems.map((vegItem) => (
        <div key={vegItem.id} className="veg-card">
            <img src={vegItem.imagelocation} alt={vegItem.name} className="veg-image" />
            <div className="veg-info">
                <h3>{vegItem.name}</h3>
                <p>Price: ₹{vegItem.price}</p>
                <button onClick={() => { disptach(addToCart(vegItem)); toast.success("The product" + vegItem.name + "Added Into Cart") }} style={{ background: 'green' }}>
                    AddToCart
                </button>
            </div>
        </div >
    ));

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />

            <ol className="veg-container">
                {vegListItems}
            </ol>
        </>
    )
}

export default Veg;