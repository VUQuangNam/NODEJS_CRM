module.exports = (params) => {
    let queries = '';
    const filter = `SELECT * FROM products `
    if (params.keyword) {
        queries += `WHERE  CAST(id AS TEXT) ILIKE '%${params.keyword}%' `;
    }

    if (params.minPice >= 0 && params.maxPice > 0) {
        if (queries === '') { queries += `WHERE price BETWEEN ${params.minPice} AND ${params.maxPice}` }
        else {
            queries += `AND price BETWEEN ${params.minPice} AND ${params.maxPice}'`
        }
    }

    if (params.unit) {
        if (queries === '') { queries += `WHERE unit = '${params.unit}'` }
        else {
            queries += `AND unit = '${params.unit}'`
        }
    }

    return filter + " " + queries + " ORDER BY id ASC";
}
