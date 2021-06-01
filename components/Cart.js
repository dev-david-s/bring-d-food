import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import AppContext from "../context/AppContext";
import { LockClosedIcon } from "@heroicons/react/outline";

function Cart() {
    const appContext = useContext(AppContext);
    const router = useRouter();

    function handleInputChange(e, item) {
        // if (item.quantity == e.target.value) return
        if (item.quantity > e.target.value) {
            appContext.removeItem(item)
        } else {
            appContext.addItem(item)
        }
        console.log(item.quantity)
    }

    const { cart, isAuthenticated } = appContext;
    return (
        <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
            <div className="flex w-full justify-center p-6 border-b-2 border-black mb-8 bg-gray-200">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Your Order:</h2>
            </div>
            <div>

                {(cart.items && cart.items.length) > 0 ?
                    (<table className="w-full text-sm lg:text-base" cellSpacing="0">
                        <thead>
                            <tr className="h-12 uppercase">
                                <th className="hidden md:table-cell"></th>
                                <th className="text-left">Product</th>
                                <th className="lg:text-right text-left pl-5 lg:pl-0">
                                    <span className="lg:hidden" title="Quantity">Qtd</span>
                                    <span className="hidden lg:inline">Quantity</span>
                                </th>
                                <th className="hidden text-right md:table-cell">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.map((item) => {
                                if (item.quantity > 0) {
                                    return (
                                        <tr key={item.id}>
                                            <td className="hidden pb-4 md:table-cell">
                                                <a href="#">
                                                    <img src={`${process.env.NEXT_PUBLIC_API_URL}${item.image[0].url}`} className="w-20 rounded"
                                                        alt="Thumbnail" />
                                                </a>
                                            </td>
                                            <td>
                                                <a href="#">
                                                    <p className="md:ml-4">{item.name}</p>
                                                </a>
                                            </td>
                                            <td className="justify-center md:justify-end md:flex mt-6">
                                                <div className="w-20 h-10">
                                                    <div className="relative flex flex-row w-full h-8">
                                                        <input type="number" value={item.quantity} onChange={(e) => handleInputChange(e, item)}
                                                            className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden text-right md:table-cell">
                                                <span className="text-sm lg:text-base font-medium">
                                                    ${item.price}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>)
                    : (
                        <div className="grid place-items-center my-8">
                            <h1 className="font-bold text-2xl">There's nothing here :(</h1>
                            <iframe src="https://giphy.com/embed/cKPViLWvlFwpVDiQhS" width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                        </div>
                    )}
                {isAuthenticated ? (
                    cart.items.length > 0 ? (
                        <div>
                            <div style={{ width: 200, padding: 10 }} color="light">
                                <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
                                <h3>${appContext.cart.total.toFixed(2)}</h3>
                            </div>
                            {router.pathname === "/cart" && (
                                <div
                                    style={{
                                        marginTop: 10,
                                        marginRight: 10,
                                    }}
                                >
                                    <div className="flex justify-center text-sm font-medium">
                                        <Link href="/checkout">
                                            <a
                                                className="mb-2 w-6/12 md:mb-0 text-center bg-gray-800 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-gray-600"
                                                aria-label="like">Order</a>
                                        </Link>
                                    </div>
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

                    <div className="flex justify-center text-sm font-medium">
                        <Link href="/login">
                            <a
                                className="flex justify-center mb-2 w-6/12 md:mb-0 text-center bg-gray-500 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-gray-600"
                                aria-label="like">
                                <LockClosedIcon className="h-6 w-6 mr-2" aria-hidden="true" />Log In to Order</a>
                        </Link>
                    </div>
                )}
                {console.log(router.pathname)}
            </div>
        </div>
    );
}
export default Cart;