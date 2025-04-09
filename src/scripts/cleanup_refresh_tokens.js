const { RefreshTokens } = require('../models/RefreshTokens');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const cleanupExpiredTokens = async () => {
    try {
        const allTokens = await RefreshTokens.findAll()

        let deleteCount = 0;

        for (const tokenRecord of allTokens) {

            try {

                jwt.verify(tokenRecord.token, process.env.JWT_REFRESH_SECRET)

            } catch(error) {

                await tokenRecord.destroy();
                deleteCount++;
            }
        }

        console.log(`✅ Cleanup complete. Tokens deleted: ${deleteCount}`)
        process.exit(0)

    } catch (error) {
        console.error(`Error during cleanup: ${error}`)
        process.exit(1)
    }
}

cleanupExpiredTokens()