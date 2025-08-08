import axios from 'axios';
import './todo.css'
import { useState, type FormEvent, type ChangeEvent } from 'react'

interface itemType {
    item: string
}


function Todo(){
    const [item, setItem] = useState<itemType>({item: ''});

    const [errors, setError] = useState<string>('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        if (!/^[A-Za-z0-9\s]+$/.test(item.item)) {
            setError("Only letters, numbers, and spaces allowed");
            return;
        };
    
        try {
            const response = await axios.post('http://localhost:3000/add', 
                { item: item.item }, // Send just the item string
                {
                    withCredentials: true, // equivalent to credentials: 'include'
                }
            );
            setItem({ item: '' });
        } catch (error) {
            console.error('Submission error:', error);
            setError("Failed to submit item");
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
            <p>{errors}</p>
            <div className='btn-container'>
                <button type='submit'>
                    enter
                </button>
            </div>
        </form>
    )
};

export default Todo