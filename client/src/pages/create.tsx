import Navbar from "../component/navbar";
import Todo from "../component/createForms/to-doForm";
import Quote from "../component/createForms/quotesForm";
import { useLocation } from "react-router-dom";
import { useState,useEffect, type JSX } from "react";

interface FormObject {
    path: string;
    label: string;
    component: JSX.Element;
}

function Create(){
    const currentLocation = useLocation();
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(()=>{
        setCurrentUrl(currentLocation.pathname)
    },[currentLocation.pathname])

    const formList: FormObject[] = [
        { path: '/to-do-form', label: 'To-do form', component:<Todo/> },
        { path: '/quotes', label: 'Quote form', component:<Quote/>  },
    ];
    const currentForm = formList.find(form => form.path === currentUrl)?.component || null
    console.log(currentUrl);
    console.log(currentForm)
    return(
        <div>
            <Navbar/>
             <h1>the two forms will be located right here</h1>
             {currentForm}
             <h2>the current parameter is {currentLocation.pathname}</h2>
        </div>
    )
}

export default Create