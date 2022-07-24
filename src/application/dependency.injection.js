import LanguageService from "../domain/language/language.service";
import LanguageRepository from "../infraestructure/languages/language.repository";
import {DINotFoundException} from "../kernel/exception";

export default function DI() {
    const dependencies = {
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
