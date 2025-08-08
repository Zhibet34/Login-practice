import Navbar from "../component/navbar";
import CreateNewPost from "../component/create";
import { useEffect, useState } from "react";
import axios from "axios";

function Home(){
    const [homeData, setHomeData] = useState({});
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios.get('http://localhost:3000/quotelist');
            setHomeData(response.data)
        }
        fetchData()
    },[])
    return(
        <div>
            <Navbar/>
             <h1>homepage is located right here</h1>
             <CreateNewPost/>
        </div>
    )
}

export default Home