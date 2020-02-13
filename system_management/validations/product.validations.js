const joi = require('joi')

module.exports = {
    ProductValidation: {
        body: {
            name: joi.string(),
            note: joi.string(),
            unit: joi.string()
                .only('Cái', 'Chiếc', 'Bộ', 'Đôi')
                .required(),
            price: joi.number().positive()
        }
    },
    ListProductValidation: {
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