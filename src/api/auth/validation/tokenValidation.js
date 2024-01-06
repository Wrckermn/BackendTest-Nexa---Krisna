const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, "nexatest", (err, decoded) => {
                if(err){
                    res.json({
                        status: 498,
                        message: "Invalid token"
                    });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                status: 401,
                message: "Access denied! Unauthorized user"
            });
        }
    }
}