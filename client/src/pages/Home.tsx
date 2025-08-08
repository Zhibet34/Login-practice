import Navbar from "../component/navbar";
import CreateNewPost from "../component/create";

function Home(){

    return(
        <div>
            <Navbar/>
             <h1>homepage is located right here</h1>
             <CreateNewPost/>
        </div>
    )
}

export default Home