const Router = require('router');
const {fetchUsers, createUser, fetchAUser, updateUser, deleteUser} = require('../controllers/userController');


const userRouter = Router()


userRouter.post('/', createUser)

userRouter.get('/', fetchUsers)

userRouter.get('/:email', fetchAUser)

userRouter.put('/:email', updateUser)

userRouter.delete('/', deleteUser)

userRouter.delete('/:email', deleteUser)


module.exports = userRouter