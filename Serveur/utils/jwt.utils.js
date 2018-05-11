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
    },
    parseAuthorization: function(authorization){
        return (authorization != null) ? authorization.replace("Bearer", "") : null;
    },
    getUserId: function(authorization){
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null){
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null){
                    userId = jwtToken._id;
                }
            } catch (error) {
                
            }
        }
        return userId;
    }
}