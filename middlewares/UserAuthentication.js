const jwt = require('jsonwebtoken');

class UserAuthentication {

    constructor(req) {
        this.req = req;
    }


    verifyToken () {
        const token = this.req.cookies.jwt;

        if (token) {
    
            try {
                const decodedToken = jwt.verify(token, "this is secret");
                
                console.log("decoded token: ", decodedToken);
                return decodedToken;

            } catch(err) {

                throw new Error(err.message);
        
            }
        } else {
            throw new Error('jwt cookie is not found');
        }
    
    } 
}

module.exports = { UserAuthentication };