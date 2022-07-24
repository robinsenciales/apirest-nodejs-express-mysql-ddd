import httpStatus from 'http-status';
import DI from "../app.container";

export default function LanguagesController() {
    return Object.freeze({
        getLanguages: async (httpRequest) => {
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const languages = await DI().get('languageUsecase').listLanguages({})
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
        getLanguage: async (httpRequest) => {
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const {id} = httpRequest.params;
                const language = await DI().get('languageUsecase').getLanguage({id})
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
        addLanguage: async (httpRequest) => {
            try {
                const {...languageInfo} = httpRequest.body
                const created = await DI().get('languageUsecase').addLanguage({
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
        updateLanguage: async (httpRequest) => {
            try {
                const {...languageInfo} = httpRequest.body
                const toEdit = {
                    ...languageInfo,
                    id: httpRequest.params.id
                }
                const edited = await DI().get('languageUsecase').editLanguage(toEdit)
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
        deleteLanguage: async (httpRequest) => {
            const headers = {
                'Content-Type': 'application/json'
            }
            try {
                const deleted = await DI().get('languageUsecase').removeLanguage({id: httpRequest.params.id})
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
