const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SQL);

const Token = sequelize.define('tokens', {
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_exist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: () => new Date()
    }
});

// (async () => {
//     await sequelize.sync({ force: true });
//     Code here
// })();
module.exports = Token;