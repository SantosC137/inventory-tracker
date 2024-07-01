const express = require('express');

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const app = express();
const port = 3000;

app.use(express.json());

// inventories
app.get('/api/inventories', async (req, res) => {
    const inventories = await db('inventories').select('*');

    return res.json({ inventories });
});
app.post('/api/inventories', async (req, res) => {
    const inventoryData = req.body;
    const inventory = await db('inventories').insert({
        product_name: inventoryData.product_name,
        stock: inventoryData.stock,
        status: inventoryData.status,
        warehouse_id: 1,
    }).returning('*');

    return res.json(inventory);
});

app.patch('/api/inventories/:inventory_id', async (req, res) =>{
    const inventoryId = req.params.inventory_id;
    const inventoryData = req.body;

    const updatedInventory = await db('inventories').update({
        product_name: inventoryData.product_name,
        stock: inventoryData.stock,
        status: inventoryData.status,
    }).where({inventory_id: inventoryId}).returning('*');

    return res.json(updatedInventory);
});

app.delete('/api/inventories/:inventory_id', async (req, res) =>{
    const inventoryId = req.params.inventory_id;
    const deletedInventory = await db('inventories').delete().where({inventory_id: inventoryId}).returning('*');

    return res.json(deletedInventory);
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));