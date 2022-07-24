import LanguagesRepository from "./language.repository";

export default function LanguagesUsecase(languagesService) {
    return Object.freeze({
        listLanguages: LanguagesRepository({languagesService}).list,
        getLanguage: LanguagesRepository({languagesService}).get,
        addLanguage: LanguagesRepository({languagesService}).add,
        editLanguage: LanguagesRepository({languagesService}).update,
        removeLanguage: LanguagesRepository({languagesService}).remove,
    })
}
