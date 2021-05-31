import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { login } from "../lib/auth";


const Login = (props) => {
    const [data, updateData] = useState({ identifier: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext.isAuthenticated) {
            router.push("/"); // redirect if you're already logged in
        }
    }, []);

    function onChange(event) {
        updateData({ ...data, [event.target.name]: event.target.value });
    }

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Log In</h1>

                    <input
                        placeholder="Email"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        onChange={(event) => onChange(event)}
                        name="identifier"
                    />

                    <input
                        placeholder="Password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        onChange={(event) => onChange(event)}
                        type="password"
                        name="password"
                    />

                    <button
                        onClick={() => {
                            setLoading(true);
                            login(data.identifier, data.password)
                                .then((res) => {
                                    setLoading(false);
                                    // set authed User in global context to update header/app state
                                    appContext.setUser(res.data.user);
                                })
                                .catch((error) => {
                                    setError(error.response.data);
                                    setLoading(false);
                                });
                        }}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-gray-500 hover:bg-gray-600 text-white hover:bg-green-dark focus:outline-none my-1"
                    >
                        {loading ? "Loading.." : "Log In"}</button>
                    <p>{Object.entries(error).length !== 0 &&
                        error.constructor === Object &&
                        error.message.map((error) => {
                            return (
                                <div
                                    key={error.messages[0].id}
                                    style={{ marginBottom: 10 }}
                                >
                                    <small style={{ color: "red" }}>
                                        {error.messages[0].message}
                                    </small>
                                </div>
                            );
                        })}</p>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            {' '} Terms of Service
                        </a>{' '} and
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            {' '} Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Don't have an account?
                    <a className="no-underline border-b border-blue text-blue" href="../register/">
                        {' '} Sign up!
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Login;