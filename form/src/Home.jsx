import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">🏡 Welcome to Yoga Center</h1>
            <p className="text-lg mb-6">Thank you for registering! Enjoy your yoga sessions. 🧘‍♂️</p>
            <Link to="/register" className="bg-blue-500 text-white px-6 py-2 rounded-lg">Register Another</Link>
        </div>
    );
}

export default Home;
