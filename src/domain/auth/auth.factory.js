import * as emailValidator from 'email-validator';
import {util} from "../../kernel/util";

export default function AuthFactory() {
    return Object.freeze({
        createFrom: ({name, username, email, password, confirmPassword} = {}) => {
            if (!name) {
                throw new Error('Register must have an name.')
            }
            if (!username) {
                throw new Error('Register must have an username.')
            }
            if (!email) {
                throw new Error('Register must have an email.')
            }
            if (!password) {
                throw new Error('Register must have an password.')
            }
            if (!confirmPassword) {
                throw new Error('Register must have a confirmation password.')
            }
            if (password != confirmPassword) {
                throw new Error('Register passwords must match.')
            }

            let sanitizedName = util.sanitize(name).trim();
            if (sanitizedName.length < 1) {
                throw new Error('Register contains no usable name.')
            }
            let sanitizedUsername = util.sanitize(username).trim();
            if (sanitizedUsername.length < 1) {
                throw new Error('Register contains no usable username.')
            }
            let sanitizedEmail = util.sanitize(email).trim();
            if (sanitizedEmail.length < 1) {
                throw new Error('Register contains no usable email.')
            }

            if (!emailValidator.validate(sanitizedEmail)) {
                throw new Error('Register contains no valid email.')
            }

            return Object.freeze({
                getName: () => sanitizedName,
                getRole: () => 'user',
                getUsername: () => sanitizedUsername,
                getEmail: () => sanitizedEmail,
                getPassword: () => password
            });
        },
        createFromEmailAndPassword: ({email, password} = {}) => {
            if (!email) {
                throw new Error('Auth must have an email.')
            }
            if (!password) {
                throw new Error('Auth must have an password.')
            }

            let sanitizedEmail = util.sanitize(email).trim();
            if (sanitizedEmail.length < 1) {
                throw new Error('Auth contains no usable email.')
            }

            return Object.freeze({
                getEmail: () => sanitizedEmail,
                getPassword: () => password
            });
        }
    })
}
