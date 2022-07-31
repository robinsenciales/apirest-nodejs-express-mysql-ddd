import httpStatus from 'http-status';
import DI from "../dependency.injection";

export default function LanguageController() {
    return Object.freeze({
        getLanguages: async (req) => {
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const languages = await DI().get('languages.service').list({})
                return {
                    headers,
                    statusCode: httpStatus.OK,
                    body: languages
                }
            } catch (e) {
                // TODO: Error logging
                console.log(e)
                return {
                    headers,
                    statusCode: httpStatus.BAD_REQUEST,
                    body: {
                        error: e.message
                    }
                }
            }
        },
        getLanguage: async (req) => {
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const {id} = req.params;
                const language = await DI().get('languages.service').get({id})
                return {
                    headers,
                    statusCode: httpStatus.OK,
                    body: language
                }
            } catch (e) {
                // TODO: Error logging
                console.log(e)
                if (e.name === 'RangeError') {
                    return {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        statusCode: httpStatus.NOT_FOUND,
                        body: {
                            error: e.message
                        }
                    }
                }
                return {
                    headers,
                    statusCode: httpStatus.BAD_REQUEST,
                    body: {
                        error: e.message
                    }
                }
            }
        },
        addLanguage: async (req) => {
            try {
                const {...languageInfo} = req.body
                const created = await DI().get('languages.service').add({
                    ...languageInfo,
                })
                return {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    statusCode: httpStatus.CREATED,
                    body: {created}
                }
            } catch (e) {
                // TODO: Error logging
                console.log(e)

                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: httpStatus.BAD_REQUEST,
                    body: {
                        error: e.message
                    }
                }
            }
        },
        updateLanguage: async (req) => {
            try {
                const {...languageInfo} = req.body
                const toEdit = {
                    ...languageInfo,
                    id: req.params.id
                }
                const edited = await DI().get('languages.service').update(toEdit)
                return {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    statusCode: httpStatus.OK,
                    body: {edited}
                }
            } catch (e) {
                // TODO: Error logging
                console.log(e)
                if (e.name === 'RangeError') {
                    return {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        statusCode: httpStatus.NOT_FOUND,
                        body: {
                            error: e.message
                        }
                    }
                }
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: httpStatus.BAD_REQUEST,
                    body: {
                        error: e.message
                    }
                }
            }
        },
        deleteLanguage: async (req) => {
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const deleted = await DI().get('languages.service').remove({id: req.params.id})
                return {
                    headers,
                    statusCode: deleted.deletedCount === 0 ? httpStatus.NOT_FOUND : httpStatus.OK,
                    body: {deleted}
                }
            } catch (e) {
                // TODO: Error logging
                console.log(e)
                return {
                    headers,
                    statusCode: httpStatus.BAD_REQUEST,
                    body: {
                        error: e.message
                    }
                }
            }
        }
    })
}
