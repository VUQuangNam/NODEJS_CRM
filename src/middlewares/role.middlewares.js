module.exports = authorize;

const Employee = require('../models/employee.model')

function authorize(roles) {
    return [
        async (req, res, next) => {
            let data = await Employee.findOne({
                where: {
                    id: req.userData.id
                }
            });
            if (data) {
                const check = data.dataValues.roles.find(x => x === roles);
                if (!check) return res.json({ message: 'Unauthorized' })
                return next();
            }
            if (!data) return res.json({ message: 'Unauthorized' })
        }
    ];
}