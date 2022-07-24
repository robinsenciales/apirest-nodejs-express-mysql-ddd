import makeLanguage from "./language.factory";

export function repositoryListLanguages({languagesRepository}) {
    return async function listLanguages({} = {}) {
        const languages = await languagesRepository.findAll({})
        return languages;
    }
}

export function repositoryGetLanguage({languagesRepository}) {
    return async function listLanguages({id} = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }

        const language = await languagesRepository.findById({id})
        if (!language) {
            throw new RangeError('Language not found.')
        }

        return language;
    }
}

export function repositoryAddLanguage({languagesRepository}) {
    return async function addLanguage(languageInfo) {
        const language = makeLanguage(languageInfo)
        const exists = await languagesRepository.findByName({name: language.getName()})
        if (exists) {
            return exists
        }

        return languagesRepository.insert({
            name: language.getName(),
            programmers: language.getProgrammers(),
        })
    }
}

export function repositoryEditLanguage({languagesRepository}) {
    return async function editLanguage({id, ...changes} = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }
        if (!changes.name) {
            throw new Error('You must supply name.')
        }
        const existing = await languagesRepository.findById({id})

        if (!existing) {
            throw new RangeError('Language not found.')
        }
        const language = makeLanguage({...existing, ...changes})
        if (language.getName() === existing.name && language.getProgrammers() === existing.programmers) {
            return existing
        }
        const updated = await languagesRepository.update({
            id,
            name: language.getName(),
            programmers: language.getProgrammers(),
        })
        return {...existing, ...updated}
    }
}

export function repositoryRemoveLanguage({languagesRepository}) {
    return async function removeLanguage({id} = {}) {
        if (!id) {
            throw new Error('You must supply a language id.')
        }

        const languageToDelete = await languagesRepository.findById({id})

        if (!languageToDelete) {
            return deleteNothing()
        }

        return hardDelete(languageToDelete)
    }

    function deleteNothing() {
        return {
            deletedCount: 0,
            softDelete: false,
            message: 'Language not found, nothing to delete.'
        }
    }

    async function hardDelete(language) {
        await languagesRepository.remove(language)
        return {
            deletedCount: 1,
            softDelete: false,
            message: 'Language deleted.'
        }
    }
}
