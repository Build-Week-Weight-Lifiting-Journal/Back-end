
exports.up = function(knex) {
  return knex.schema.createTable('workouts', tbl => {
      tbl.increments();

      tbl.string('name', 225).notNullable();

      tbl.date('date');

      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('workouts');
};
