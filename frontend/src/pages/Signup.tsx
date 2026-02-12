import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function Signup() {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function signup() {
        try {
            setError("");
            setLoading(true);

            const username = usernameRef.current?.value;
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
            const firstName = firstNameRef.current?.value;
            const lastName = lastNameRef.current?.value;

            // Validate all fields are filled
            if (!username || !email || !password || !firstName || !lastName) {
                setError("Please fill in all fields");
                setLoading(false);
                return;
            }

            // Make API request to backend
            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                email,
                password,
                firstName,
                lastName
            });

            // Store JWT token in localStorage
            const token = response.data.token;
            localStorage.setItem("token", token);

            // Navigate to dashboard on success
            alert("Signup successful!");
            navigate("/dashboard");

        } catch (err: any) {
            console.error("Signup error:", err);
            
            // Handle error responses
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError("An error occurred during signup. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen bg-gradient-to-br from-purple-50 to-gray-100 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md p-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                    <p className="text-gray-600 text-sm">Join GutBrain and start organizing your knowledge</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <div className="space-y-4">
                    <Input 
                        ref={usernameRef} 
                        placeholder="Username" 
                        label="Username"
                        type="text"
                    />
                    <Input 
                        ref={emailRef} 
                        placeholder="Email" 
                        label="Email"
                        type="email"
                    />
                    <Input 
                        ref={firstNameRef} 
                        placeholder="First Name" 
                        label="First Name"
                        type="text"
                    />
                    <Input 
                        ref={lastNameRef} 
                        placeholder="Last Name" 
                        label="Last Name"
                        type="text"
                    />
                    <Input 
                        ref={passwordRef} 
                        placeholder="Password" 
                        label="Password"
                        type="password"
                    />
                </div>

                <div className="flex justify-center pt-6">
                    <Button 
                        onClick={signup} 
                        variant="primary" 
                        title={loading ? "Signing up..." : "Sign Up"} 
                        size="md" 
                    />
                </div>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/signin")}
                            className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
