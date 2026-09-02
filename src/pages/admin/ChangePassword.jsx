import { useState } from "react";
import { FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

import { changePassword } from "../../services/api";

export default function ChangePassword() {

    const [form, setForm] = useState({

        currentPassword: "",
        newPassword: "",
        confirmPassword: ""

    });

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function submit(e) {

        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {

            return toast.error(
                "Passwords do not match."
            );

        }

        try {

            const { data } = await changePassword({

                currentPassword: form.currentPassword,

                newPassword: form.newPassword

            });

            toast.success(data.message);

            setForm({

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to change password."

            );

        }

    }

    return (

        <div className="max-w-xl mx-auto">

            <div className="bg-white shadow-lg rounded-xl p-8">

                <div className="flex items-center gap-3 mb-8">

                    <FaLock className="text-2xl text-[#0F4C81]" />

                    <h2 className="text-2xl font-bold">

                        Change Password

                    </h2>

                </div>

                <form
                    onSubmit={submit}
                    className="space-y-5"
                >

                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={form.currentPassword}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={form.newPassword}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <button
                        className="w-full bg-[#0F4C81] text-white py-3 rounded-lg hover:bg-blue-900 transition"
                    >

                        Update Password

                    </button>

                </form>

            </div>

        </div>

    );

}