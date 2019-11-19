
exports.seed = function(knex) {
  // Deletes ALL existing entries
 
      return knex('table_name').insert([
        {id: 1, name: 'rowValue1', duser_id: 1},
        {id: 2, name: 'rowValue2', duser_id: 2},
        {id: 3, name: 'rowValue3', duser_id: 3}
      ]);
};
