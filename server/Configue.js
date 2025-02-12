const config = {
    development: {
        localUrl: 'http://localhost:3000/theatre/user_reset_password/',
        // localUrl: 'http://hybrid.srishticampus.in/theatre/user_reset_password/',
    },
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];
