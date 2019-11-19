
exports.seed = function(knex) {
  // Deletes ALL existing entries
 
      return knex('workouts').insert([
        {name: 'stronk', date: null, user_id: 1},
        {name: 'Intense Workout', date: null, user_id: 1},
        {name: 'Daily Workout', date: null, user_id: 1},
        {name: 'Adrenaline Pumping', date: null, user_id: 2},
        {name: 'P50X', date: null, user_id: 2},
        {name: 'Calisthenics', date: null, user_id: 2},
        {name: 'Bodybuilding', date: null, user_id: 3},
        {name: 'Powerlifting', date: null, user_id: 3},
        {name: 'Regular Workout', date: null, user_id: 3}
      ]);
};
