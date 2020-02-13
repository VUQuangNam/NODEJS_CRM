const joi = require('joi')

module.exports = {
    OrderValidation: {
        body: {
            name: joi.string(),
            note: joi.string(),
            items: joi.array().min(1)
        }
    },
    ListOrderValidation: {
        query: {
            keyword: joi.string()
                .allow(null, ''),
            start_time: joi.number().allow(null, ''),
            end_time: joi.number().allow(null, '')
        }
    }
}