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

    test('throw an error when wrong or no data or incomplete data is given', async()=>{
        const response = await request(app).post('/fruits').send({
            name: "user 29",
            aged: 30
        })
        expect(response.body.error[0].msg).toBe("Invalid value")
    })
})

describe('Fruits test',()=>{
    beforeAll(async()=>{
        await db.sync({force: true})
        await User.bulkCreate(seedUsers)
        await Fruit.bulkCreate(seedFruits)
    })

    test("Get all Fruits", async()=>{
        const response = await request(app).get('/fruits')
        expect(response.body.length).toEqual(4)
    })
    test("Get fruit by id", async()=>{
        const response = await request(app).get('/fruits/1')
        expect(response.body).toEqual(expect.objectContaining( {
            name: "Apple",
            color: "Red"
        }))
    })

    test("Post can add fruit to the db", async()=>{
        const response = await request(app).post('/fruits').send( {
            name: "Mango",
            color: "Red"
        })

        expect(response.body).toEqual(expect.objectContaining({
            name: "Mango",
            color: "Red"
        }))
    })

    test('Put can update the fruit with the id passed', async()=>{
        const response = await request(app).put('/fruits/5').send( {
            name: "Mango",
            color: "Green"
        })

        expect(response.body).toEqual(expect.objectContaining({
            name: "Mango",
            color: "Green"
        }))
    })

    test('can delete fruit with the id passed in as request params', async()=>{
        const response = await request(app).delete('/fruits/5')
        expect(response.body).toEqual(expect.objectContaining({
            name: "Mango",
            color: "Green"
        }))
    })

    test('throw an error when wrong or no data or incomplete data is given', async()=>{
        const response = await request(app).post('/fruits').send({
            name: "Mango",
            clor: "Red"
        })
        expect(response.body.error[0].msg).toBe("Invalid value")
    })
})