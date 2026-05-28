import { INTERNAL_SERVER_ERROR, INVALID_PAYLOAD, OK } from '../../../../lib/util/httpStatus.js';
import { generateToken, generateRefreshToken, TOKEN_TYPES } from '../../../../lib/util/jwt.js';
export default (async (request, response, next)=>{
    try {
        const message = 'Invalid email or password';
        const { body } = request;
        const { email, password } = body;
        await request.loginUserWithEmail(email, password, (error)=>{
            if (error) {
                response.status(INTERNAL_SERVER_ERROR);
                response.json({
                    error: {
                        status: INTERNAL_SERVER_ERROR,
                        message
                    }
                });
                return;
            }
        });
        response.status(OK);
        const accessToken = generateToken({
            user: request.locals.user
        }, TOKEN_TYPES.ADMIN);
        const refreshToken = generateRefreshToken({
            user: request.locals.user
        }, TOKEN_TYPES.ADMIN);
        response.json({
            data: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        response.status(INVALID_PAYLOAD).json({
            error: {
                message: error.message,
                status: INVALID_PAYLOAD
            }
        });
    }
});
