import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        phone: '',
        batch: '',
        month: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        
            // Convert response to JSON
            const data = await response.json();
        
            if (!response.ok) {
                // Handle errors by showing toast and redirecting
                toast.error(data.error || '❌ Error processing request', {
                    position: 'top-right',
                    autoClose: 3000,
                });
        
                // Redirect after 3 seconds
                setTimeout(() => {
                    navigate('/');
                }, 3000);
                return; // Stop execution
            }
        
            // If status is 200, show success message
            toast.success(`Payment Successful! Transaction`, {
                position: 'top-right',
                autoClose: 2000,
            });
        
            console.log(data);
        
            // Redirect to Home page after success
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            toast.error('❌ Network error, please try again!', {
                position: 'top-right',
                autoClose: 3000,
            });
        
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg cursor-pointer">
                <h2 className="text-2xl mb-4">Yoga Admission Form</h2>

                <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border mb-2 cursor-pointer" required />
                <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full p-2 border mb-2" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border mb-2" required />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border mb-2" required />
                
                <select name="batch" onChange={handleChange} className="w-full p-2 border mb-2 cursor-pointer" required>
                    <option value="">Select Batch</option>
                    <option value="6-7AM">6-7AM</option>
                    <option value="7-8AM">7-8AM</option>
                    <option value="8-9AM">8-9AM</option>
                    <option value="5-6PM">5-6PM</option>
                </select>

                <input type="month" name="month" placeholder="Month" onChange={handleChange} className="w-full p-2 border mb-2 cursor-pointer" required />

                <button type="submit" className="w-full bg-blue-500 text-white p-2">Register</button>
            </form>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
}

export default Register;
