exports.seed = function(knex) {
      return knex('exercises').insert([
        { name: "Squats", region: 'Quads'},
        { name: "Curls", region: 'Biceps'},
        { name: "Pushups", region: 'Chest'},
        { name: "Lunges", region: 'Hamstrings'},
        { name: "Pull Ups", region: 'Back'}
      ]);
};
