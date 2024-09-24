const express = require('express')
const router = express.Router()
const { User }= require('../models/index')


router.get('/',async (req,res, next)=>{
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.get('/:id', async(req,res, next)=>{
    try {
        const id = req.params.id
        const user = await User.findByPk(id)
        res.json(user)
    } catch (error) {
        console.error(error);
        next(error)
    }
})

router.post('/', async (req, res, next)=>{
    try {
        const body = req.body;
        const newUser = await User.create(body)
        res.json(newUser)
    } catch (error) {
        console.error(error);
        next(error)
    }
})

router.put('/:id', async(req,res, next)=>{
    try {
        const id = req.params.id
        const body = req.body;
        const userToUpdate = await User.findByPk(id)
        const updatedUser = await userToUpdate.update(body)
        res.json(updatedUser)
    } catch (error) {
        console.error(error);
        next(error)
        
    }
})

router.delete('/:id', async(req,res, next)=>{
    try {
        const id = req.params.id
        const userToDelete = await User.findByPk(id)
        const deletedUser = await userToDelete.destroy(userToDelete)
        res.json(deletedUser)
    } catch (error) {
        console.error(error);
        next(error)
    }
})

module.exports = router;