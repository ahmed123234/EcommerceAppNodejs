class UserAuthorities {

    constructor(userAuth, requiredRole) {
    
        this.requiredRole = requiredRole;
        this.userAuth = userAuth; // userAuthunticated object

    }


    check_User_Authorities () {
        try {

            const currentRole = this.userAuth.verifyToken().role;
            console.log("role: ", currentRole);

            if (currentRole.toUpperCase() === this.requiredRole) {
                console.log("access is legal");
        
            } else {
                throw Error("Access Denied");
            }
        } catch(err) {
            throw Error(err.message);
        }

    }
}



class AdminAuthorities extends UserAuthorities {
    constructor(token, requiredRole) {
        super(token, requiredRole);
    }
}


class CustomerAuthorities extends UserAuthorities {
    constructor(token,requiredRole ) {
        super(token, requiredRole);
    }
}


class SellerAuthorities extends UserAuthorities {
    constructor(token, requiredRole) {
        super(token, requiredRole);
    }
}



class USERROLE {
    constructor(name) {
        this.name = name;
    }
}


module.exports = { UserAuthorities };