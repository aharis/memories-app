import jwt from 'jsonwebtoken';
//if req past oll, then (NEXT) say ok, you can go to controller
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.jwtSecret);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; //sub is googles name for specific Id for diferent google user
        }
        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth;