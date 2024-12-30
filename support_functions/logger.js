const fs = require('fs');
const path = require('path');

const LOG_FILE = process.env.LOG_FILE || path.join(__dirname, 'logs.txt');

const logger = (message, level = 'INFO') => {
    const timestamp = new Date().toISOString();
    const entry = `[${level}] ${timestamp} - ${message}\n`;
    try {
        fs.appendFileSync(LOG_FILE, entry, 'utf8');
    } catch (error) {
        console.error(`Failed to write log: ${error.message}`);
    }
};

module.exports = logger;
