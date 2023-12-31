const jwt = require('jsonwebtoken');
const JWT_SECRET = 'fashion@Factory'

const fetchuser = async (req, res, next) => {
    const token = req.header('jwtData')
    if (!token) {
        return res.status(401).send({ status:false,message: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next();
    }
    catch (error) {
        console.log("error in fetchuser:",error)
        return res.status(401).send({status:false, message: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser