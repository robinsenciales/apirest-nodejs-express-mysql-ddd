import AuthFactory from "./auth.factory";

export default function AuthService(userRepository, authUtil, authHelper) {
    return Object.freeze({
        login: async ({email, password}) => {
            const passwordEncrypt = await authHelper.encrypt(password);
            const loginForm = AuthFactory().createFromEmailAndPassword({email, password: passwordEncrypt})
            const exists = await userRepository.findByEmail({email: loginForm.getEmail()})
            if (!exists) {
                throw new Error('Invalid credentials')
            }

            if (!await authHelper.compare(password, exists.password)) {
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
            const passwordEncrypt = await authHelper.encrypt(registerForm.getPassword());
            console.log('passwordEncrypt ', passwordEncrypt)
            const insertedUser = await userRepository.insert({
                name: registerForm.getName(),
                role: registerForm.getRole(),
                username: registerForm.getUsername(),
                email: registerForm.getEmail(),
                password: passwordEncrypt,
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
