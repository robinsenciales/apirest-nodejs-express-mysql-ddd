import {Router} from 'express';
import LanguageController from '../controllers/language.controller'
import makeCallback from '../express-callback'

const router = Router();

router.get('/', makeCallback(LanguageController().getLanguages))
router.get('/:id', makeCallback(LanguageController().getLanguage))
router.post('/', makeCallback(LanguageController().addLanguage))
router.put('/:id', makeCallback(LanguageController().updateLanguage))
router.delete('/:id', makeCallback(LanguageController().deleteLanguage))

export default router;
