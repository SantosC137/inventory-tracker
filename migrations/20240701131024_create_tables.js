/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('warehouses', (table) => {
    table.bigIncrements('warehouse_id', {primaryKey: true});
    table.text('address').notNullable();
  })
  .createTable('inventories', (table) => {
    table.bigIncrements('inventory_id', {primaryKey: true});
    table.text('product_name').notNullable();
    table.integer('stock').notNullable();
    table.text('status').notNullable();
    table.bigInteger('warehouse_id').notNullable().references('warehouses.warehouse_id');
  })
  .createTable('employees', (table) => {
    table.bigIncrements('employee_id', {primaryKey: true});
    table.text('name').notNullable();
    table.text('phone').notNullable();
    table.text('email').notNullable();
    table.text('address').notNullable();
  })
  .createTable('borrows', (table) => {
    table.bigInteger('inventory_id', {primaryKey: true}).references('inventories.inventory_id');
    table.bigInteger('employee_id', {primaryKey: true}).references('employees.employee_id');
    table.timestamp('borrow_time').notNullable();
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTable('borrows')
  .dropTable('employees')
  .dropTable('inventories')
  .dropTable('warehouses');

};
