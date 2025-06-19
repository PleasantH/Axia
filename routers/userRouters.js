const Router = require('router');
const {fetchUsers, createUser, fetchAUser, updateUser, deleteUser, login} = require('../controllers/userController');


const userRouter = Router()


userRouter.post('/', createUser)

userRouter.post('/login', login)

userRouter.get('/', fetchUsers)

userRouter.get('/:email', fetchAUser)

userRouter.put('/:email', updateUser)

userRouter.delete('/', deleteUser)

userRouter.delete('/:email', deleteUser)


module.exports = userRouter