import axios from 'axios';
import './quote.css';
import { useState, type FormEvent, type ChangeEvent } from 'react';

function Quote() {
    const [quote, setQuote] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setQuote(e.target.value);
        setError('');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validation
        if (!quote.trim()) {
            setError('Quote cannot be empty');
            return;
        }

        if (quote.length > 35) {  // Changed to match maxLength
            setError('Quote must be 35 characters or less');  // Updated error message
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/add-quote',
                { quote },  // Send as object property
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',  // Recommended header
                    },
                }
            );
            console.log('Quote posted:', response.data);
            setQuote(''); 
        } catch (err) {
            setError('Failed to submit quote');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='input-container'>
                <label htmlFor="quote">Enter Quote</label>
                <textarea
                    id="quote"
                    name="quote"
                    onChange={handleChange}
                    value={quote}
                    maxLength={35}
                />
                {error && <p className="error">{error}</p>}
            </div>
            <div className='btn-container'>
                <button type="submit">Post</button>
            </div>
        </form>
    );
}

export default Quote;