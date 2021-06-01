
import { useContext } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/CheckoutForm";
import AppContext from "../context/AppContext";

import Cart from "../components/Cart";

function Checkout() {
    // get app context
    const appContext = useContext(AppContext);
    // isAuthenticated is passed to the cart component to display order button
    const { isAuthenticated } = appContext;

    // load stripe to inject into elements components
    const stripePromise = loadStripe("pk_test_51IuH9QHjf3T3eOmUctptCX3s2jjii6dydUI1YYUPqENtICGqUY6rdC8FNvWCOgweXLGjJ8sKBT7Ql7L3l9cQynVQ00di4F4QfB");

    return (
        <div>
            <div style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
                <h1 style={{ margin: 20 }}>Checkout</h1>
                <Cart isAuthenticated={isAuthenticated} />
            </div>
            <div style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
                <Elements stripe={stripePromise}>
                    <InjectedCheckoutForm />
                </Elements>
            </div>
        </div>
    );
    // }
}
export default Checkout;