import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/create-component.css';

interface FormObject {
    path: string;
    label: string;
}

function CreateNewPost() {
    const navigate = useNavigate();
    const [signedIn, setSignedIn] = useState<{ isAuthenticated: boolean; user?: any }>({
        isAuthenticated: false
    });
    const [message, setMessage] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [showFormOptions, setShowFormOptions] = useState(false);

    const formlist: FormObject[] = [
        { path: '/to-do-form', label: 'To-do form' },
        { path: '/quotes', label: 'Quote form' },
    ];

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth', {
                    withCredentials: true
                });
                setSignedIn(response.data);
            } catch (error) {
                console.error('Auth check failed:', error);
                setSignedIn({ isAuthenticated: false });
            }
        };
        checkStatus();
    }, []);

    const handleClick = () => {
        if (signedIn.isAuthenticated) {
            setShowFormOptions(!showFormOptions);
        } else {
            setMessage('Please log in to create a post');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleFormSelect = (path: string) => {
        navigate(path);
    };

    

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (!message.startsWith('Please log in')) {
            setMessage('');
        }
    };

    return (
        <div className="create-new-post-container">
            <h3
                onClick={handleClick}
                
                onMouseLeave={handleMouseLeave}
                className="create-new-post-heading"
                style={{ color: isHovered ? '#0066cc' : 'inherit' }}
            >
                Create a new post !!!
            </h3>
            {message && <p className="create-new-post-message">{message}</p>}
            {showFormOptions && signedIn.isAuthenticated && (
                <div className="create-new-post-form-options">
                    {formlist.map((form) => (
                        <div
                            key={form.path}
                            onClick={() => handleFormSelect(form.path)}
                            className="create-new-post-form-option"
                        >
                            {form.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CreateNewPost;