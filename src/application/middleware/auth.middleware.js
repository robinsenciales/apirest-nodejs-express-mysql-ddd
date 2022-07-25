import httpStatus from 'http-status'

export default function AuthMiddleware(userRepository, authUtil) {
    return Object.freeze({
        checkAuth: async (req, res, next) => {
            try {
                const token = req.headers['authorization'].split(' ').pop();
                const tokenData = await authUtil.verifyToken(token);
                if (check(req, res, tokenData)) {
                    next()
                }
            } catch (e) {
                console.log(e)
                if (e.message == 'jwt expired') {
                    expiredToken(req, res);
                } else {
                    unauthorized(req, res);
                }
            }
        },
        checkRoleAuth: (roles) => async (req, res, next) => {
            try {
                const token = req.headers['authorization'].split(' ').pop();
                const tokenData = await authUtil.verifyToken(token);
                const userData = await userRepository.findByUsername({username: tokenData.username})
                if ([].concat(roles).includes(userData.role)) {
                    next()
                } else {
                    unauthorized(req, res);
                }
            } catch (e) {
                console.log(e)
                if (e.message == 'jwt expired') {
                    expiredToken(req, res);
                } else {
                    unauthorized(req, res);
                }
            }
        }
    })

    function check(req, res, tokenData) {
        if (!tokenData.name) unauthorized(req, res);
        return true;
    }

    function unauthorized(req, res) {
        res.status(httpStatus.UNAUTHORIZED);
        res.send({error: 'Access denied'})
        return false;
    }

    function expiredToken(req, res) {
        res.status(httpStatus.UNAUTHORIZED);
        res.send({error: 'Expired token'})
        return false;
    }
}
