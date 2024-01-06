require('dotenv').config();
const express = require('express');
const app = express();
const adminRouter = require('./src/api/auth/routes/authRoutes');
const karyawanRouter = require('./src/api/karyawan/routes/karyawanRoutes');

app.use(express.json());

app.use('/api/admin', (adminRouter));
app.use('/api/karyawan', (karyawanRouter));

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server sedang berjalan di http://localhost:${port}`);
});
