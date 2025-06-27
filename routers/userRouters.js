const Router = require('router');
const {fetchUsers, createUser, fetchAUser, updateUser, deleteUser, login, logout} = require('../controllers/userController');


const userRouter = Router()


userRouter.post('/', createUser)

userRouter.post('/login', login)

userRouter.post('/logout', logout)

userRouter.get('/', fetchUsers)

userRouter.get('/:email', fetchAUser)

userRouter.put('/:email', updateUser)

userRouter.delete('/', deleteUser)

userRouter.delete('/:email', deleteUser)


module.exports = userRouter