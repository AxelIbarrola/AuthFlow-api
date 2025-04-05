const { sequelize } = require('../config/database');

(async () => {

        let exitCode = 0

        try{
            await sequelize.authenticate();
            console.log('✅ Successful synchronized tables.')
        } catch(error) {
            exitCode = 1;
            console.log(`❌ Synchronization error with tables: ${error}`)
        } finally {
            await sequelize.close();
            console.log('🔥 Connection closed successfully.');
            process.exit(exitCode)
        }
    }
)();
