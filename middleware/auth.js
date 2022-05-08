const jwt = require('jsonwebtoken')

module.exports = function (req,res,next) {
    const bearerHeader= req.headers.authorization;
    if (!bearerHeader) {
        return res.status(401).send('Access denied, No token provided.')
    } 
    try {
        const bearer= bearerHeader.split(' ')
        const bearerToken= bearer[1]
        const decoded = jwt.verify(bearerToken, 'xxx');
        req.user=decoded
        next()
    } catch (error) {
        console.log('error',error);
        res.status(400).send('Invalid Token')
    }
    
}

//mongodb+srv://admin123:admin123@devconnector.tais8.mongodb.net/test