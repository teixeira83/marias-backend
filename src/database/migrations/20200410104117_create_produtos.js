exports.up = function(knex) {
  return knex.schema.createTable('produtos', function(table) {
    table.string('id').primary();
    table.string('titulo').notNullable();
    table.string('descricao').notNullable();
    table.string('imgKey');
    table.string('imgUrl');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos');
};
