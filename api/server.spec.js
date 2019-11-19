const request = require("supertest");

const server = require("./server")

it('should set db environment to testing', function() {
    expect(process.env.DB_ENV).toBe('testing');
})