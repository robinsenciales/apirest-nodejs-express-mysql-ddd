import {Router} from 'express';
import LanguagesController from '../controllers/languages.controller'
import makeCallback from '../express-callback'

const router = Router();

router.get('/', makeCallback(LanguagesController().getLanguages))
router.get('/:id', makeCallback(LanguagesController().getLanguage))
router.post('/', makeCallback(LanguagesController().addLanguage))
router.put('/:id', makeCallback(LanguagesController().updateLanguage))
router.delete('/:id', makeCallback(LanguagesController().deleteLanguage))

export default router;
