require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path=require('path');
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,          // MySQL host from .env
    user: process.env.DB_USER,          // MySQL user from .env
    password: process.env.DB_PASSWORD,  // MySQL password from .env
    database: process.env.DB_NAME,      // MySQL database name from .env
    port: process.env.DB_PORT || 3306   // Default MySQL port
});

// ✅ Connect to MySQL Database
db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database!");
    }
});

// ✅ Mock Payment Function
function CompletePayment(userDetails, callback) {
    setTimeout(() => {
        callback({ success: true, transactionId: Math.random().toString(36).substring(7), message: "Payment Successful" });
    }, 1000);
}

// ✅ Register User API
app.post('/register', (req, res) => {
    const { name, age, email, phone, batch, month } = req.body;

    // Age validation
    if (age < 18 || age > 65) {
        return res.status(400).json({ error: "Age must be between 18 and 65" });
    }

    // Email validation (simple regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Phone validation (check if it contains only digits and is 10 characters long)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: "Phone number must be 10 digits" });
    }

    // Simulate payment process
    CompletePayment({ name, email, phone, batch, month }, (paymentRes) => {
        if (paymentRes.success) {
            // Prepare SQL query to insert the user into the YogaUsers table
            const query = `
                INSERT INTO YogaUsers (name, age, email, phone, batch, month, payment_status)
                VALUES (?, ?, ?, ?, ?, ?, 'Paid')
            `;

            // Execute the query with user details
            db.execute(query, [name, age, email, phone, batch, month], (err, result) => {
                if (err) {
                    console.error("❌ Database Insert Error:", err);
                    return res.status(500).json({ error: "Database Error" });
                }

                // Return success response with transactionId
                res.json({ success: true, transactionId: paymentRes.transactionId });
            });
        } else {
            res.status(400).json({ error: "Payment Failed" });
        }
    });
});

app.use(express.static(path.join(__dirname,'form/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'form','dist','index.html'));
})

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
