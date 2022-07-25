import httpStatus from 'http-status';
import DI from "../dependency.injection";

export default function AuthController() {
    return Object.freeze({
        login: async (httpRequest) => {
            try {
                const {email, password} = httpRequest.body
                const login = await DI().get('auth.service').login({
                    email,
                    password
                })
                return {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    statusCode: httpStatus.OK,
                    body: {login}
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
        register: async (httpRequest) => {
            try {
                const {...userInfo} = httpRequest.body
                const register = await DI().get('auth.service').register({
                    ...userInfo,
                })
                return {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    statusCode: httpStatus.CREATED,
                    body: {register}
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
    })
}
