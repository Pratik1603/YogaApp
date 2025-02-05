import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import Home from './Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
