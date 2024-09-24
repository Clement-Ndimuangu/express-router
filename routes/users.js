const express = require('express')
const router = express.Router()
const { User }= require('../models/index')
const {check, validationResult} = require('express-validator')


router.get('/',async (req,res)=>{
    const users = await User.findAll()
    res.json(users) 
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id
    const user = await User.findByPk(id)
    res.json(user)
})

router.post('/',[check('name').not().isEmpty().trim().isLength({min: 5, max:15}), check('age').not().isEmpty().trim()], async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const body = req.body;
        const newUser = await User.create(body)
        res.json(newUser)
    }
})

router.put('/:id',[check(['name','age']).not().isEmpty().trim()],async(req,res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const id = req.params.id
        const body = req.body;
        const userToUpdate = await User.findByPk(id)
        const updatedUser = await userToUpdate.update(body)
        res.json(updatedUser)
    }
})

router.delete('/:id', async(req,res, next)=>{
    const id = req.params.id
    const userToDelete = await User.findByPk(id)
    const deletedUser = await userToDelete.destroy(userToDelete)
    res.json(deletedUser)
})

module.exports = router;