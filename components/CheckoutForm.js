
import { useState, useContext } from "react";

import fetch from "isomorphic-fetch";
import Cookies from "js-cookie";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import AppContext from "../context/AppContext";


function CheckoutForm() {
    const [data, setData] = useState({
        address: "",
        city: "",
        state: "",
        stripe_id: "",
    });
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const appContext = useContext(AppContext);

    function onChange(e) {
        // set the key = to the name property equal to the value typed
        const updateItem = (data[e.target.name] = e.target.value);
        // update the state data object
        setData({ ...data, updateItem });
    }

    async function submitOrder() {
        // // Use elements.getElement to get a reference to the mounted Element.
        const cardElement = elements.getElement(CardElement);

        // // Pass the Element directly to other Stripe.js methods/
        // get token back from stripe to process credit card
        const token = await stripe.createToken(cardElement);
        const userToken = Cookies.get("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method: "POST",
            headers: userToken && { Authorization: `Bearer ${userToken}` },
            body: JSON.stringify({
                amount: Number(Math.round(appContext.cart.total + "e2") + "e-2"),
                dishes: appContext.cart.items,
                address: data.address,
                city: data.city,
                state: data.state,
                token: token.token.id,
            }),
        });

        if (!response.ok) {
            setError(response.statusText);
        }
    }

    return (
        <div>
            <h5>Your information:</h5>
            <hr />
            <div style={{ display: "flex" }}>
                <div style={{ flex: "0.90", marginRight: 10 }}>
                    <span>Address</span>
                    <input name="address" onChange={onChange} />
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ flex: "0.65", marginRight: "6%" }}>
                    <span>City</span>
                    <input name="city" onChange={onChange} />
                </div>
                <div style={{ flex: "0.25", marginRight: 0 }}>
                    <span>State</span>
                    <input name="state" onChange={onChange} />
                </div>
            </div>

            <CardSection data={data} stripeError={error} submitOrder={submitOrder} />
        </div>
    );
}
export default CheckoutForm;