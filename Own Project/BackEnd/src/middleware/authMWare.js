import jwt from 'jsonwebtoken'
import UserModel from '../database/models/userModel.js'

const authMiddleware = async (req, res, next) => {
    try {
        console.log(`Request to ${req.method} route ${req.originalUrl}`.cyan)
        console.log('    Authenticating user...'.yellow)

        // Check for token
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            console.log('        Not authorized, missing or invalid authorization header\n'.red)
            return res.status(401).json({ errorMessage: 'Not authorized, missing or invalid authorization header' })
        }

        // Get token from header
        const token = req.headers.authorization.split(' ')[1]

        // Verify token
        const verifiedToken = verifyToken(token)
        if (!verifiedToken) {
            console.log('        Not authorized, failed to verify token\n'.red)
            return res.status(401).json({ errorMessage: 'Not authorized, failed to verify token' })
        }

        // Check if user exists
        const existingUser = await UserModel.findById(verifiedToken.userId).select('-password')
        if (!existingUser) {
            console.log('        Not authorized, user not found\n'.red)
            return res.status(401).json({ errorMessage: 'Not authorized, user not found' })
        }

        console.log('        User authenticated'.green)
        req.user = existingUser
        next()
    } catch (error) {
        console.log('        Authentication failed\n'.red)
        console.log(error)
        res.status(500).json({ errorMessage: 'Authentication failed' })
    }
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null
    }
}

export default authMiddleware

// EOF
