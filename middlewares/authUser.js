import jwt from 'jsonwebtoken'

export const authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized!",
                success: false
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized!",
                success: false
            })
        }
        req.user = decoded.id;
        next();
    } catch (error) {
        console.error("Authentication Error ",error);        
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}