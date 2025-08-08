import axios from 'axios';
import './todo.css'
import { useState, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';

interface itemType {
    item: string
}


function Todo(){
    const navigateHome = useNavigate();
    const [item, setItem] = useState<itemType>({item: ''});

    const [errors, setError] = useState<string>('')

    const handleSubmit = async (e: FormEvent)=>{
        e.preventDefault();

        if (!/^[A-Za-z0-9\s]+$/.test(item.item)) {
            setError("Only letters, numbers, and spaces allowed");
            return;
        };

        try {
            const response = await axios.post('http://localhost:3000/add',item)
            console.log('form was submitted', response.data)
            setItem({
                item: ''
            });
            navigateHome('/');
        } catch (error) {
            console.log(errors)
        }
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>)=>{
        setItem({item: e.target.value});
        setError('')
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className='input-container'>
                <label htmlFor="item">enter item</label>
                <input 
                onChange={handleChange}
                type="text" 
                name="item" 
                id='item' 
                maxLength={16}
                value={item.item}
                title="Only letters, numbers, and spaces allowed"
                required
                />
            </div>
            <div className='btn-container'>
                <button type='submit'>
                    enter
                </button>
            </div>
        </form>
    )
};

export default Todo