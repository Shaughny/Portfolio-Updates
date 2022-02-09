import express from 'express';

const {createUser,getAllUsers,deleteUser,updateUser} = require('../controllers/UserController')

const router = express.Router();





router.get('/get', getAllUsers);

router.post('/', createUser);

router.delete('/:id',deleteUser )

router.put('/', updateUser)

module.exports = router;