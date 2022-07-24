import {
    repositoryAddLanguage,
    repositoryEditLanguage,
    repositoryGetLanguage,
    repositoryListLanguages,
    repositoryRemoveLanguage
} from './language.repository'

export default function LanguagesUsecase(languagesRepository) {
    const listLanguages = repositoryListLanguages({languagesRepository})
    const getLanguage = repositoryGetLanguage({languagesRepository})
    const addLanguage = repositoryAddLanguage({languagesRepository})
    const editLanguage = repositoryEditLanguage({languagesRepository})
    const removeLanguage = repositoryRemoveLanguage({languagesRepository})

    return Object.freeze({
        listLanguages,
        getLanguage,
        addLanguage,
        editLanguage,
        removeLanguage,
    })
}
