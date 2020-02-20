const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SQL);

const Upload = sequelize.define('uploads', {
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    create_by: DataTypes.JSONB
});

// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
// })();
module.exports = Upload;