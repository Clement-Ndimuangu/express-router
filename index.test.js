const app = require('./src/app')
const request = require('supertest')
const {describe, test, expect, beforeAll} = require("@jest/globals")
const db = require('./db/connection')
const {User,Fruit} = require('./models/index')
const {seedFruits,seedUsers} = require('./seedData')

describe('User test',()=>{
    beforeAll(async()=>{
        await db.sync({force: true})
        await User.bulkCreate(seedUsers)
        await Fruit.bulkCreate(seedFruits)
    })

    test("Get all users", async()=>{
        const response = await request(app).get('/users')
        expect(response.body.length).toEqual(4)
    })
    test("Get user by id", async()=>{
        const response = await request(app).get('/users/1')
        expect(response.body).toEqual(expect.objectContaining( {
            name: "User 1",
            age: 30
        }))
    })

    test("Post can add user to the db", async()=>{
        const response = await request(app).post('/users').send( {
            name: "User 5",
            age: 28
        })

        expect(response.body).toEqual(expect.objectContaining({
            name: "User 5",
            age: 28
        }))
    })

    test('Put can update the user with the id passed', async()=>{
        const response = await request(app).put('/users/5').send( {
            name: "User 20",
            age: 40
        })

        expect(response.body).toEqual(expect.objectContaining({
            name: "User 20",
            age: 40
        }))
    })

    test('can delete user with the id passed in as request params', async()=>{
        const response = await request(app).delete('/users/5')

        expect(response.body).toEqual(expect.objectContaining({
            name: "User 20",
            age: 40
        }))
    })
})