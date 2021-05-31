import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import AppContext from "../context/AppContext";

function Cart() {
    const appContext = useContext(AppContext);
    const router = useRouter();

    const { cart, isAuthenticated } = appContext;

    return (
        <div>
            <div style={{ padding: "10px 5px" }} className="cart">
                <h1>Your Order:</h1>
                <hr />
                <div>
                    <div>
                        <small>Items:</small>
                    </div>
                    <div>
                        {cart.items
                            ? cart.items.map((item) => {
                                if (item.quantity > 0) {
                                    return (
                                        <div
                                            className="items-one"
                                            key={item.id}
                                        >
                                            <div>
                                                <span id="item-price">&nbsp; ${item.price}</span>
                                                <span id="item-name">&nbsp; {item.name}</span>
                                            </div>
                                            <div>
                                                <button
                                                    style={{
                                                        height: 25,
                                                        padding: 0,
                                                        width: 15,
                                                        marginRight: 5,
                                                        marginLeft: 10,
                                                    }}
                                                    onClick={() => appContext.addItem(item)}
                                                >
                                                    +
                          </button>
                                                <button
                                                    style={{
                                                        height: 25,
                                                        padding: 0,
                                                        width: 15,
                                                        marginRight: 10,
                                                    }}
                                                    onClick={() => appContext.removeItem(item)}
                                                >
                                                    -
                          </button>
                                                <span style={{ marginLeft: 5 }} id="item-quantity">
                                                    {item.quantity}x
                          </span>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                            : null}
                        {isAuthenticated ? (
                            cart.items.length > 0 ? (
                                <div>
                                    <div style={{ width: 200, padding: 10 }} color="light">
                                        <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
                                        <h3>${appContext.cart.total.toFixed(2)}</h3>
                                    </div>
                                    {router.pathname === "/restaurants" && (
                                        <div
                                            style={{
                                                marginTop: 10,
                                                marginRight: 10,
                                            }}
                                        >
                                            <Link href="/checkout">
                                                <button style={{ width: "100%" }} color="primary">
                                                    <a>Order</a>
                                                </button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {router.pathname === "/checkout" && (
                                        <small
                                            style={{ color: "blue" }}
                                            onClick={() => window.history.back()}
                                        >
                                            back to restaurant
                                        </small>
                                    )}
                                </>
                            )
                        ) : (
                            <h5>Login to Order</h5>
                        )}
                    </div>
                    {console.log(router.pathname)}
                </div>
            </div>
        </div>
    );
}
export default Cart;