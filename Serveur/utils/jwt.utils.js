var jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "fzjzopr3h187ehheer5y87654fgf3e57y89g46ef5g4eekpykjh8465bt978";

module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            _id: userData.id,
            identifiant: userData.identifiant
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: "1h"
        })
    }
}