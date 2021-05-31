import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const Register = () => {
    const [data, setData] = useState({ email: "", username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const appContext = useContext(AppContext);

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        disabled={loading}
                        onChange={(e) =>
                            setData({ ...data, username: e.target.value })
                        }
                        value={data.username}
                        placeholder="Username"
                        type="text"
                        name="username" />

                    <input
                        placeholder="Email"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                        }
                        value={data.email}
                        type="email"
                        name="email" />

                    <input
                        placeholder="Password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                        }
                        value={data.password}
                        type="password"
                        name="password"
                    />

                    <button
                        disabled={loading}
                        onClick={() => {
                            setLoading(true);
                            registerUser(data.username, data.email, data.password)
                                .then((res) => {
                                    // set authed user in global context object
                                    appContext.setUser(res.data.user);
                                    setLoading(false);
                                })
                                .catch((error) => {
                                    setError(error.response.data);
                                    setLoading(false);
                                });
                        }}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-gray-500 hover:bg-gray-600 text-white hover:bg-green-dark focus:outline-none my-1"
                    >
                        {loading ? "Loading.." : "Create Account"}</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    );
};
export default Register;