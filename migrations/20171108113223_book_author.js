
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('book_author', (table) => {
      table.increments().primary
      table.integer('book_id').references('book.id')
      table.integer('author_id').references('author.id')


    })
  ])
}


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('book_author')
  ])
};
