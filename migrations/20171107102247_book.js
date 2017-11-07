exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('book', (table) => {
      table.increments().primary
      table.string('title')
      table.string('cover')
      table.string('author1')
      table.string('author2')
      table.string('author3')
      table.string('genre')
			table.text('description')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('book')
  ])
};
