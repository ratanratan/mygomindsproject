import { useSelector } from "react-redux";
import "./Orders.css";

function Orders() {
    let orders = useSelector((globalState) => globalState.orders);

    return (
        <div className="orders-container">
            <h1 className="orders-title">Orders History</h1>

            {orders.length === 0 ? (
                <p className="empty-message">No orders placed yet.</p>
            ) : (
                <ul className="orders-list">
                    {orders.map((purchase, index) => (
                        <li key={index} className="order-card">
                            <div className="order-header">
                                <span className="order-date">
                                    {purchase.date}
                                </span>
                                <span className="order-total">
                                    ${purchase.totalPrice.toFixed(2)}
                                </span>
                            </div>

                            <ul className="items-list">
                                {purchase.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="item-row">
                                        <span>{item.name}</span>
                                        <span>
                                            ${item.price} × {item.quantity}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Orders;