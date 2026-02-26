import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";
import { useAuth } from "../context/AuthContext";
import "../styles/register.css";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        phone_number: "",
        gmail: "",        // ✅ Added gmail
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Updated validation
        if (
            !formData.username ||
            !formData.phone_number ||
            !formData.gmail ||
            !formData.password
        ) {
            message.warning("All fields are required");
            return;
        }

        setLoading(true);

        const result = await register(formData);

        if (result.success) {
            message.success("Account created successfully! Please login.");

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } else {
            message.error(result.message || "Registration failed");
        }

        setLoading(false);
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />

                    {/* ✅ NEW GMAIL FIELD */}
                    <input
                        type="email"
                        name="gmail"
                        placeholder="Gmail Address"
                        value={formData.gmail}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Register"}
                    </button>
                </form>

                <p className="redirect-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
