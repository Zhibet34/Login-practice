import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/loginform.css'

interface LoginType {
    username: string,
    password: string,
}

function LoginForm(){
    const returnHome = useNavigate();

    const [loginData, setLoginData] = useState<LoginType>({
        username: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setLoginData(prev =>({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async(e: FormEvent)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login',{
                username: loginData.username,
                password: loginData.password
            },{withCredentials: true});
            setLoginData({
                username: '',
                password: ''
            });
            console.log('login is successfull', response.data)
            returnHome('/')
        } catch (error) {
            console.log('failed to log in', error)
        }
    }
    return(
        <form onSubmit={handleSubmit} className="form">
            <div className="input-container">
                <label 
                    htmlFor="username">
                    username
                </label>
                <input 
                    type="text" 
                    name='username' 
                    onChange={handleChange}
                    value={loginData.username}
                    id="username"
                    minLength={1}
                    maxLength={10} 
                    required
                />
            </div>

            <div className="input-container">
                <label 
                    htmlFor="password">
                    password
                </label>
                <input 
                    type="password" 
                    name="password"
                    onChange={handleChange}
                    value={loginData.password}
                    id="password"
                    minLength={1}
                    maxLength={16}
                    required
                />
            </div>

            <div className="button-container">
                <button 
                    type="submit" 
                    className="register-button-2"
                >
                    Register
                </button>
            </div>

            <div className="bottom-container">
               Dont have an account ?{' '}
                <a 
                    href="/register" 
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 pl-3"
                >
                    Register
                </a>
            </div>
        </form>
    ) 
};

export default LoginForm;