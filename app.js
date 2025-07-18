const express = require('express');
const sequelize = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js')
const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/admin',adminRoutes);
sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(8000, () => console.log("Server running on http://localhost:8000"));
}).catch(err => {
  console.error("Database connection error:", err);
});
 