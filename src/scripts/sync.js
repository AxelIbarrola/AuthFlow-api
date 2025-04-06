const { sequelize } = require('../config/database');
const { User } = require('../models/User');

(
    async() => {

        let exitCode = 0;

        try {
            await sequelize.sync();
            console.log('✅ Successful synchronization with the database.')
        }catch(error) {
            console.log(`❌ Synchronization error: ${error}`)
            exitCode = 1;
        }finally{
            await sequelize.close();
            console.log('🔥 Connection closed successfully.');
            process.exit(exitCode)
        }
    }
)();