import express from 'express'
import { loginUser, signUpUser, logoutUser,deleteUser,
    getUserById,updateUserById,
    getAllUsers ,getUserProfile,updateUserProfile}
     from '../controllers/user.controller.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').post(signUpUser).get(authenticate,authorizeAdmin,getAllUsers);

router.post('/login',loginUser);
router.post('/logout',logoutUser)

router.route('/profile').get(authenticate,getUserProfile).put(authenticate,updateUserProfile)

// admin routes

router.route('/:id').delete(authenticate,authorizeAdmin,deleteUser)
.get(authenticate,authorizeAdmin,getUserById)
.put(authenticate,authorizeAdmin,updateUserById);

export default router;