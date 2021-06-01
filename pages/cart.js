import Cart from "../components/Cart";
import Header from "../components/Header";

function cart() {
    return (
        <div className="h-screen bg-gray-200">
            <Header />
            <div className="flex justify-center my-6">
                <Cart />
            </div>
        </div>
    )
}

export default cart
