
exports.seed = function(knex) {
  // Deletes ALL existing entries
 
      return knex('workouts').insert([
        {name: 'stronk', date: null, user_id: 1},
        {name: 'muscle', date: null, user_id: 2},
        {name: 'big', date: null, user_id: 3}
      ]);
};
