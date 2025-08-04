import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";

function Home(){
    const navigate = useNavigate()

    return(
        <div>
            <Navbar/>
             <h1>homepage is located right here</h1>
        </div>
    )
}

export default Home