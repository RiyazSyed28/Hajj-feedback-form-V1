import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginAdmin } from "../../services/api";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        remember: false
    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        const { name, value, checked, type } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const { data } = await loginAdmin({

                username: form.username,
                password: form.password

            });

            localStorage.setItem("token", data.token);

            localStorage.setItem("admin", JSON.stringify(data.admin));

            navigate("/admin/dashboard");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Login failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-blue-700">

                        Hajj Feedback Portal

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Administrator Login

                    </p>

                </div>

                {error && (

                    <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-4">

                        {error}

                    </div>

                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>

                        <label className="block mb-2 font-medium">

                            Username / Email

                        </label>

                        <input

                            type="text"

                            name="username"

                            value={form.username}

                            onChange={handleChange}

                            required

                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"

                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Password

                        </label>

                        <div className="relative">

                            <input

                                type={showPassword ? "text" : "password"}

                                name="password"

                                value={form.password}

                                onChange={handleChange}

                                required

                                className="w-full border rounded-lg p-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"

                            />

                            <button

                                type="button"

                                onClick={() => setShowPassword(!showPassword)}

                                className="absolute right-4 top-4"

                            >

                                {

                                    showPassword

                                        ? <FaEyeSlash />

                                        : <FaEye />

                                }

                            </button>

                        </div>

                    </div>

                    <div className="flex items-center">

                        <input

                            type="checkbox"

                            name="remember"

                            checked={form.remember}

                            onChange={handleChange}

                            className="mr-2"

                        />

                        Remember Me

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold"

                    >

                        {

                            loading

                                ? "Signing In..."

                                : "Login"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}