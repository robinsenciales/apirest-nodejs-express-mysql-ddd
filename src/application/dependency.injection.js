import {DINotFoundException} from "../kernel/exception";

import AuthService from "../domain/auth/auth.service";
import UserRepository from "../infraestructure/auth/user.repository";
import AuthUtil from "../infraestructure/auth/auth.util";
import AuthHelper from "../infraestructure/auth/auth.helper";
import AuthMiddleware from "./middleware/auth.middleware";

import LanguageService from "../domain/language/language.service";
import LanguageRepository from "../infraestructure/language/language.repository";

export default function DI() {
    const dependencies = {
        'auth.service': AuthService(UserRepository(), AuthUtil(), AuthHelper()),
        'auth.middleware': AuthMiddleware(UserRepository(), AuthUtil()),
        'languages.service': LanguageService(LanguageRepository()),
    };
    return Object.freeze({
        get: (name) => {
            if (!dependencies[name])
                throw DINotFoundException(`Service ${name} not found`)
            return dependencies[name];
        }
    });
}
