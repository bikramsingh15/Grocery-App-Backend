import jwt from 'jsonwebtoken'

// login seller: api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.cookie(
                "sellerToken",
                token,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV,
                    sameSite: process.env.NODE_ENV ? 'none' : 'strict',
                    maxAge: 1 * 24 * 60 * 60 * 1000
                }
            )
            res.status(200).json({
                message: "Seller Login successfull",
                success: true
            })
        } else {
            res.status(400).json({
                message: "Email or Password is not valid!",
                success: false
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

// logout seller: api/seller/logout

export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken",
            {
                httpOnly: true,
                secure: process.env.NODE_ENV,
                sameSite: process.env.NODE_ENV ? 'none' : 'strict',
            }
        )
        res.json({
            message: "Seller Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

// check Seller is Authenticated: /api/seller/is-auth

export const isAuthSeller = async (req, res) => {
    try {
        res.status(200).json({
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}