const express = require('express')
const router = express.Router()
const {Fruit} = require('../models/index')
const {check, validationResult} = require('express-validator')


router.get('/',async (req,res)=>{
    const fruits = await Fruit.findAll()
    res.json(fruits) 
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id
    const fruit = await Fruit.findByPk(id)
    res.json(fruit)
})

router.post('/',[check('color').not().isEmpty().trim(), check('name').not().isEmpty().trim().isLength({min: 5, max:15})], async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const body = req.body;
        const newFruit = await Fruit.create(body)
        res.json(newFruit)
    }
})

router.put('/:id', [check(['color','name']).not().isEmpty().trim()],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const id = req.params.id
        const body = req.body;
        const fruitToUpdate = await Fruit.findByPk(id)
        const updatedFruit = await fruitToUpdate.update(body)
        res.json(updatedFruit)
    }
})

router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    const fruitToDelete = await Fruit.findByPk(id)
    const deletedFruit = await fruitToDelete.destroy(fruitToDelete)
    res.json(deletedFruit)
})


module.exports = router;