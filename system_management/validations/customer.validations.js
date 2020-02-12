const joi = require('joi')

module.exports = {
    CustomerValidation: {
        body: {
            name: joi.string(),
            username: joi.string(),
            password: joi.string(),
            address: joi.string(),
            phone: joi.string().length(10),
            gender: joi.string().only('male', 'female'),
            age: joi.number().integer().min(1),
            birthday: joi.date().less('12/30/2020')
        }
    },
    ListCustomerValidation: {
        query: {
            gender: joi.array()
                .items(joi.string())
                .allow(null, ''),
            keyword: joi.string()
                .allow(null, ''),
            start_time: joi.number().allow(null, ''),
            end_time: joi.number().allow(null, '')
        }
    }
}