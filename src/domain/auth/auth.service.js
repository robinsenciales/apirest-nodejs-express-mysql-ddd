import AuthFactory from "./auth.factory";

export default function AuthService(userRepository, authUtil) {
    return Object.freeze({
        login: async ({email, password}) => {
            const loginForm = AuthFactory().createFromEmailAndPassword({email, password})
            const exists = await userRepository.findByEmail({email: loginForm.getEmail()})
            if (!exists) {
                throw new Error('Invalid credentials')
            }

            if (password != exists.password) {
                throw new Error('Invalid credentials')
            }

            return auth(exists);
        },
        register: async (userInfo) => {
            const registerForm = AuthFactory().createFrom(userInfo)
            const exists = await userRepository.findByEmail({email: registerForm.getEmail()})
            if (exists) {
                throw new Error('Email is in use')
            }

            const insertedUser = await userRepository.insert({
                name: registerForm.getName(),
                role: registerForm.getRole(),
                username: registerForm.getUsername(),
                email: registerForm.getEmail(),
                password: registerForm.getPassword(),
            })

            return auth(insertedUser);
        }
    })

    async function auth(userData) {
        const {id, password, ...user} = userData;
        const token = await authUtil.generateToken(user)
        return {user, token};
    }
}
