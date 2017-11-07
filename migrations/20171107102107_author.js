exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('author', (table) => {
      table.increments().primary
      table.string('name')
      table.text('bio')
      table.string('portrait')

    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('author')
  ])
};
