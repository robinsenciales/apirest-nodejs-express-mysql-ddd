import LanguagesUsecase from "../domain/language/languages.usecases";
import LanguagesService from "../infraestructure/languages/languages.service";
import {DINotFoundException} from "../kernel/exception";

export default function DI() {
    const dependencies = {
        'languages.use-case': LanguagesUsecase(LanguagesService()),
    };
    return Object.freeze({
        get: (name) => {
            if (!dependencies[name])
                throw DINotFoundException(`Service ${name} not found`)
            return dependencies[name];
        }
    });
}
