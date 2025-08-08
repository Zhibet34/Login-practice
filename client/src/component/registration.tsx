import {useState, type FormEvent, type ChangeEvent} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/registration.css'

interface RegistrationData {
    email: string,
    username: string,
    password: string
};



function Registration(){
    const redirectToHome = useNavigate();

    const [formData, setFormData] = useState<RegistrationData>({
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e: FormEvent)=>{
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/register', {
                email: formData.email,
                username: formData.username,
                password: formData.password
            });

            console.log("user is register", response.data);

            setFormData({
                email: '',
                username: '',
                password: ''
            })
            redirectToHome('/')
        } catch (error) {
            console.log('failed to register user', error)
        }
    }
    return(
        <form onSubmit={handleSubmit} className="registration-form">
            <div className="input-container">
                <label htmlFor="username">
                    username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={20}
                    title="Only letters, numbers and underscores allowed"
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="email">
                    email
                </label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    minLength={6}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="password">
                    password
                </label>
                <input 
                    type="password"
                    id="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={16}
                    title="3-16 characters (letters, numbers, or !@#$%^&*)"
                />

            </div>

            <div className="button-container">
                <button 
                    type="submit" 
                    className="register-button"
                >
                    Register
                </button>
            </div>
            
            <div className="bottom-container">
                have an account ?{' '}
                <a 
                    href="/login" 
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 pl-3"
                >
                    login here
                </a>
            </div>
        </form>
    )
};

export default Registration