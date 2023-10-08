const TELEGRAM_API_BASE_URL = 'https://api.telegram.org/bot';

class Database {
    constructor(databaseConnection) {
        this.db = databaseConnection;
    }

    async getSetting(settingName) {
        return await this.db.prepare(
            "SELECT value FROM settings WHERE name = ?"
          )
            .bind(settingName)
            .first('value');
    }

    async initSetting(settingName, settingValue) {
        return await this.db.prepare(
            "INSERT INTO settings (createdDate, name, value) VALUES (DATETIME('now'), ?, ?)"
          )
            .bind(settingName, settingValue)
            .run();
    }

    async addMessage(message) {
        return await this.db.prepare(
            "INSERT INTO messages (createdDate, message) VALUES (DATETIME('now'), ?)"
          )
            .bind(message)
            .run();
    }

    async addInitDataCheck(initData, expectedHash, calculatedHash) {
        return await this.db.prepare(
            "INSERT INTO initDataChecks (createdDate, initData, expectedHash, calculatedHash) VALUES (DATETIME('now'), ?, ?, ?, ?)"
          )
            .bind(initData, expectedHash, calculatedHash)
            .run();
    }
}

export { Database }