import LanguageFactory from "./language.factory";

export default function LanguageService(languageRepository) {
    return Object.freeze({
        list: async ({} = {}) => {
            const languages = await languageRepository.findAll({})
            return languages;
        },
        get: async ({id} = {}) => {
            if (!id) {
                throw new Error('You must supply an id.')
            }

            const language = await languageRepository.findById({id})
            if (!language) {
                throw new RangeError('Language not found.')
            }

            return language;
        },
        add: async (languageInfo) => {
            const language = LanguageFactory().createFrom(languageInfo)
            const exists = await languageRepository.findByName({name: language.getName()})
            if (exists) {
                return exists
            }

            return languageRepository.insert({
                name: language.getName(),
                programmers: language.getProgrammers(),
            })
        },
        update: async ({id, ...changes} = {}) => {
            if (!id) {
                throw new Error('You must supply an id.')
            }
            if (!changes.name) {
                throw new Error('You must supply name.')
            }
            const existing = await languageRepository.findById({id})

            if (!existing) {
                throw new RangeError('Language not found.')
            }
            const language = LanguageFactory().createFrom({...existing, ...changes})
            if (language.getName() === existing.name && language.getProgrammers() === existing.programmers) {
                return existing
            }
            const updated = await languageRepository.update({
                id,
                name: language.getName(),
                programmers: language.getProgrammers(),
            })
            return {...existing, ...updated}
        },
        remove: async ({id} = {}) => {
            if (!id) {
                throw new Error('You must supply a language id.')
            }

            const languageToDelete = await languageRepository.findById({id})

            if (!languageToDelete) {
                return deleteNothing()
            }

            return hardDelete(languageToDelete)
        }
    })

    function deleteNothing() {
        return {
            deletedCount: 0,
            softDelete: false,
            message: 'Language not found, nothing to delete.'
        }
    }

    async function hardDelete(language) {
        await languageRepository.remove(language)
        return {
            deletedCount: 1,
            softDelete: false,
            message: 'Language deleted.'
        }
    }
}
