
exports.up = function(knex) {
  return knex.schema.createTable('exercises', tbl => {
      tbl.increments();
      tbl.string('name').notNullable();
      tbl.string('region').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('exercises')
};
