import { useEffect, useState } from "react";
import { FaUserCircle, FaSave } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getProfile,
    updateProfile
} from "../../services/api";

export default function Profile() {

    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({

        username: "",
        email: "",
        role: "",
        created_at: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const { data } = await getProfile();

            setForm(data);

        }

        catch (err) {

            console.error(err);

            toast.error("Unable to load profile");

        }

        finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function saveProfile(e) {

        e.preventDefault();

        try {

            await updateProfile({

                username: form.username,

                email: form.email

            });

            toast.success("Profile updated successfully");

        }

        catch (err) {

            console.error(err);

            toast.error("Failed to update profile");

        }

    }

    if (loading) {

        return (

            <div className="flex justify-center items-center h-96">

                Loading Profile...

            </div>

        );

    }

    return (

        <div className="max-w-5xl mx-auto space-y-8">

            <div>

                <h1 className="text-3xl font-bold">

                    Admin Profile

                </h1>

                <p className="text-gray-500 mt-2">

                    Manage your administrator account

                </p>

            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">

                <div className="flex flex-col items-center">

                    <FaUserCircle
                        size={110}
                        className="text-[#0F4C81]"
                    />

                    <h2 className="mt-4 text-2xl font-bold">

                        {form.username}

                    </h2>

                    <p className="text-gray-500">

                        {form.role}

                    </p>

                </div>

                <form
                    onSubmit={saveProfile}
                    className="mt-10 grid md:grid-cols-2 gap-6"
                >

                    <div>

                        <label className="block mb-2 font-medium">

                            Username

                        </label>

                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Role

                        </label>

                        <input
                            value={form.role}
                            readOnly
                            className="w-full border rounded-lg p-3 bg-gray-100"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">

                            Member Since

                        </label>

                        <input
                            value={new Date(form.created_at).toLocaleDateString()}
                            readOnly
                            className="w-full border rounded-lg p-3 bg-gray-100"
                        />

                    </div>

                    <div className="md:col-span-2 flex justify-between mt-6">

                        <button
                            type="submit"
                            className="bg-[#0F4C81] text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-blue-900 transition"
                        >

                            <FaSave />

                            Save Changes

                        </button>

                        <Link
                            to="/admin/change-password"
                            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
                        >

                            Change Password

                        </Link>

                    </div>

                </form>

            </div>

        </div>

    );

}