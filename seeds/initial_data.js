/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('borrows').del();
  await knex('employees').del();
  await knex('inventories').del();
  await knex('warehouses').del();

  const warehouses = await knex('warehouses').insert([
    {address: 'Desa Jumput, Kabupaten Bojonegoro'},
  ]).returning('warehouse_id');

  const inventories = await knex('inventories').insert([
    {product_name: 'jackhammer', stock: 2, status: 'available', warehouse_id: warehouses[0].warehouse_id },
    {product_name: 'mesin_bor', stock: 5, status: 'available', warehouse_id: warehouses[0].warehouse_id },
    {product_name: 'mesin_gerinda', stock: 5, status: 'available', warehouse_id: warehouses[0].warehouse_id },
    {product_name: 'mesin_las', stock: 3, status: 'available', warehouse_id: warehouses[0].warehouse_id },
  ]).returning('inventory_id');

  const employees = await knex('employees').insert([
    {name: 'norman_barry', phone: '082367811123', email: 'barrynorman1@gmail.com', address: 'pasuruan'},
    {name: 'kacung', phone: '085667878891', email: 'cakkacung@gmail.com', address: 'tuban'},
    {name: 'fernando_kurniawan', phone: '088912125556', email: 'nandogembel@gmail.com', address: 'gresik'},
  ]).returning('employee_id');

  await knex('borrows').insert([
    {inventory_id: inventories[0].inventory_id, employee_id: employees[0].employee_id, borrow_time: new Date()}
  ]);
}
