const joi = require('joi')

module.exports = {
    OrderValidation: {
        body: {
            name: joi.string(),
            note: joi.string(),
            price: joi.number().positive()
        }
    },
    ListOrderValidation: {
        query: {
            min_price: joi.number().allow(null, '').min(0),
            max_price: joi.number().allow(null, ''),
            keyword: joi.string()
                .allow(null, ''),
            start_time: joi.number().allow(null, ''),
            end_time: joi.number().allow(null, '')
        }
    }
}