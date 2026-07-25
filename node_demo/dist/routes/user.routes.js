import { Router } from 'express';
import { createUser, getUsers, getUserById } from '../controllers/userController.js';
const router = Router();
router.route('/')
    .post(createUser)
    .get(getUsers);
router.route('/:id')
    .get(getUserById);
export default router;
