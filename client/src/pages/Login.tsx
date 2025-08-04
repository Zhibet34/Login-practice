import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import '../App.css'

function Login(){
    const navigate = useNavigate()

    return(
        <>
            <Navbar/>
            <h1>Login page</h1>
        </>
    )
};

export default Login;