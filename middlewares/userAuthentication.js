
const jwt = require("jsonwebtoken");

const userAuthentication = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.auhthorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        let token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message:"User in not authorise"
                })
            } else {
               
            }
        })
    }
}
module.exports = userAuthentication;