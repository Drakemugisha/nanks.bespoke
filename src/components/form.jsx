import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/form.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Loader from "../components/loader";

function Form({ route, method }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordAgain: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const isLogin = method === "login";
    const name = isLogin ? "Login" : "Register";
    const passwordsMatch = isLogin || formData.password === formData.passwordAgain;

    // Password validation function
    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        
        // Check for at least one number or special character
        const hasNumberOrSpecial = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
        if (!hasNumberOrSpecial) {
            return "Password must contain at least one number or special character";
        }
        
        return ""; // Empty string means valid
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Auto-set passwordAgain to match password in login mode
            ...(isLogin && name === "password" ? { passwordAgain: value } : {})
        }));

        // Validate password when it changes (only in register mode)
        if (name === "password" && !isLogin) {
            setPasswordError(validatePassword(value));
        }
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate password before submission for register
        if (!isLogin) {
            const validationError = validatePassword(formData.password);
            if (validationError) {
                setPasswordError(validationError);
                return;
            }
        }
        
        setLoading(true);
        setError("");

        try {
            const res = await api.post(route, { 
                email: formData.email, 
                password: formData.password 
            });
            
            if (isLogin) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                
                // Use replace to avoid the history stack issue
                navigate("/", { replace: true });
            } else {
                navigate("/login", { replace: true });
            }
        } catch (error) {
            if(error.status === 401){
                setError("Invalid email or password");
            }else if(error.status === 400){
                setError("email already taken");
            }
            else{
                alert(error);
            }
            // setError(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit} className="form-container">
                <Link to="/">
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </Link>
                
                <h1>{name}</h1>
                
                {error && <p className="error-message text-red-500">{error}</p>}
                
                <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email"
                    required
                />
                
                <input
                    className="form-input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                
                {!isLogin && passwordError && (
                    <p className="text-red-500">{passwordError}</p>
                )}
                
                {!isLogin && (
                    <input 
                        className="form-input"
                        type="password"
                        name="passwordAgain"
                        value={formData.passwordAgain}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                )}
                
                {!passwordsMatch && (
                    <p className="password-mismatch">Passwords do not match</p>
                )}
                
                {loading ? (
                    <div> <Loader/> </div>
                ) : (
                    <button 
                        className="form-button" 
                        type="submit"
                        disabled={!passwordsMatch || loading || (!isLogin && passwordError)}
                    >
                        {name}
                    </button>
                )}
                
                <div className="form-footer">
                    {isLogin ? (
                        <p>Need an account?<Link to="/register"> <p className="text-white">Sign up</p></Link></p>                        
                    ) : (
                        <p>Already have an account?<Link to="/login">  <p className="text-white">login</p></Link></p>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Form;