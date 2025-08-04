import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";

function Register(){
    const navigate = useNavigate()

    return(
        <>
            <Navbar/>
            <h1>registration page</h1>
        </>
    )
};

export default Register;