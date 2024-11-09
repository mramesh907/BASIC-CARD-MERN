const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model.js');
const router = express.Router();

// get all users
router.get('/users', async (req, res) => {
    try {
        
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// get single user
router.get('/user/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// delete single user

router.delete('/duser/:id',async (req,res)=>{
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json({message:'User deleted',deletedUser});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// update user
router.patch('/upuser/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports=router