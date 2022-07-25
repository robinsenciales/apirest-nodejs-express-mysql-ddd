import {Router} from 'express';
import makeCallback from '../express-callback'
import AuthController from '../controllers/auth.controller'

const router = Router();

router.post('/login', makeCallback(AuthController().login))
router.post('/register', makeCallback(AuthController().register))

export default router;
