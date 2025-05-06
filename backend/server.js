const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');


app.use(express.json());
app.use(cors());
app.use("/api/Products", productRoutes);  // ✅ Ensure route is registered
app.use('/api', cartRoutes);
app.use('/api', adminRoutes);



app.use(express.static(path.join(__dirname, '../public')));



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});