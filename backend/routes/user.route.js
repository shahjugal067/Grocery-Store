import express from 'express'
import { loginUser, signUpUser, logoutUser,deleteUser,
    getAllUsers ,getUserProfile,updateUserProfile}
     from '../controllers/user.controller.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').post(signUpUser).get(authenticate,authorizeAdmin,getAllUsers);

router.post('/auth',loginUser);
router.post('/logout',logoutUser)

router.route('/profile').get(authenticate,getUserProfile).put(authenticate,updateUserProfile)

router.route('/:id').delete(authenticate,authorizeAdmin,deleteUser);

export default router;