import {Router} from 'express';
import makeCallback from '../express-callback'
import DI from "../dependency.injection"
import LanguageController from '../controllers/language.controller'

const router = Router();

router.get(
    '/',
    DI().get('auth.middleware').checkAuth,
    DI().get('auth.middleware').checkRoleAuth(['admin']),
    makeCallback(LanguageController().getLanguages)
);

router.get(
    '/:id',
    DI().get('auth.middleware').checkAuth,
    DI().get('auth.middleware').checkRoleAuth(['admin']),
    makeCallback(LanguageController().getLanguage)
);

router.post(
    '/',
    DI().get('auth.middleware').checkAuth,
    DI().get('auth.middleware').checkRoleAuth(['admin']),
    makeCallback(LanguageController().addLanguage)
);

router.put(
    '/:id',
    DI().get('auth.middleware').checkAuth,
    DI().get('auth.middleware').checkRoleAuth(['admin']),
    makeCallback(LanguageController().updateLanguage)
);

router.delete(
    '/:id',
    DI().get('auth.middleware').checkAuth,
    DI().get('auth.middleware').checkRoleAuth(['admin']),
    makeCallback(LanguageController().deleteLanguage)
);

export default router;
