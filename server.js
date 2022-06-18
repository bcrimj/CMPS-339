const express = require('express');
const cors = require('cors');
const dbOperation = require('./dbFiles/dbOperation.js');
const Customer = require('./dbFiles/customer.js');
const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.get('/api', async(req, res)  => {
    console.log('Called');
    const result = await dbOperation.getCustomer();
    res.send(result.recordset)
});

app.post('/create', async(req, res) => {
    await dbOperation.createCustomer(req.body);
    const result = await dbOperation.getCustomer();
    console.log('Called create');
    res.send(result.recordset)
});




app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));