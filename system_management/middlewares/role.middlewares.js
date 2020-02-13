module.exports = authorize;

const Employee = require('../models/employee.model')

function authorize(roles) {
    return [
        async (req, res, next) => {
            let data = await Employee.findOneEmployee(req.userData.id);
            if (data.status === 200) {
                const check = data.data.role.find(x => x === roles);
                if (!check) return res.json({ message: 'Unauthorized' })
                return next();
            }
            if (!data.data) return res.json({ message: 'Unauthorized' })
        }
    ];
}