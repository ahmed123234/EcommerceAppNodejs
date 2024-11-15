const { UserAuthorities } = require('./authoroties');
const userModel  = require('../models/user-model')


const check_User_Authorities = (req, res, requiredRole, next) => {

    try {

        const userAuthorities = new UserAuthorities(new UserAuthentication(req) , requiredRole);

        userAuthorities.check_User_Authorities();

     } catch(err) {
        console.log(err.message);

        if (err.message.includes("Access Denied")) {
           
            res.status(401).json({ error: "user does'nt has the required permissions to access that resouece, access denied!" })
        
        } else {
           
            res.redirect('account/signup');
        }
 
     } finally {
        next();
     }
}

const { UserAuthentication } = require('./UserAuthentication');

module.exports.check_Admin_authorities = (req, res, next) => {
    
    check_User_Authorities(req, res, "ADMIN", next);
}


module.exports.check_Customer_authorities = (req, res, next) => {
    check_User_Authorities(req, res, "CUSTOMER", next);

}


module.exports.check_Seller_authorities = (req, res, next) => {
    check_User_Authorities(req, res, "SELLER", next);

}



























// const verify_token = (req) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         try {

//             const decodedToken = jwt.verify(token, "this is secret");
//             console.log(decodedToken);
//             return decodedToken.role;

//         } catch(err) {

//             console.log(err);
//             throw new Error(err.message);

//         }

//     } else {
//         throw new Error('jwt cookie is not found');
//     }

// } 

module.exports.verify_JWT = (req, res, next) => {

    

    try {

      const auth = new UserAuthentication(req);

      auth.verifyToken();

    } catch(err) {
        console.log(err.message);
        res.redirect('account/login');
    }

    next();
}


// check the current user details
module.exports.checkUser = async (req, res, next) => {
    

    try {
        const auth = new UserAuthentication(req);

        const decodedToken = auth.verifyToken();

        const user = await userModel.findById(decodedToken.id).select('email');
            console.log("email is"  + user.email);
            // inject the user email into views using locals
            res.locals.email = user.email;

    }catch(err) {
        res.locals.email = null;
    }

    // calll the next middleware
    next();
}
