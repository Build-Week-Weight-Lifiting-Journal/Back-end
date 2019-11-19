exports.seed = function(knex) {
    return knex('users').insert([
      { username: "dylan", email: 'dylan@gmail.com', password: "dylanpass" },
      { username: "william", email: 'william@gmail.com', password: "williampass" },
      { username: "testing", email: 'testing@gmai.com', password: "testingpass" },
      { username: "example", email: 'example@gmail.com', password: "examplepass" },
      { username: "user", email: 'user@gmail.com', password: "userpass" },
    ]);
};

