import LanguageUsecase from "../domain/language/languages.usecases";
import languagesService from "../infraestructure/languages/languages.service";
import {DINotFoundException} from "../kernel/exception";

export default function DI() {
    const dependencies = {
        languageUsecase: LanguageUsecase(languagesService),
    };
    return Object.freeze({
        get: (name) => {
            if (!dependencies[name])
                throw DINotFoundException(`Service ${name} not found`)
            return dependencies[name];
        }
    });
}
