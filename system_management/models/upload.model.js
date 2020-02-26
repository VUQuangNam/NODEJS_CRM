const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SQL);

const Upload = sequelize.define('uploads', {
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    create_by: DataTypes.JSONB,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: () => new Date()
    }
});

module.exports = Upload;