const config = {
    development: {
        localUrl: 'http://localhost:3000/theatre/reset-password/',
        serverUrl: 'http://hybrid.srishticampus.in/theatre/reset-password/',
    },
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];
