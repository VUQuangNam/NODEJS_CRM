module.exports = (ix, params) => {
    let queries = '';
    const filter = `SELECT * FROM ${ix} `
    if (params.keyword) {
        queries += `WHERE  CAST(id AS TEXT) ILIKE '%${params.keyword}%' OR  name || ' '|| username  ILIKE '%${params.keyword}%' `;
    }

    if (params.gender) {
        if (queries === '') { queries += `WHERE gender = '${params.gender}'` }
        else {
            queries += `AND gender = '${params.gender}'`
        }
    }

    if (params.minAge >= 0 && params.maxAge > 0) {
        if (queries === '') { queries += `WHERE age BETWEEN ${params.minAge} AND ${params.maxAge}` }
        else {
            queries += `AND age BETWEEN ${params.minAge} AND ${params.maxAge}'`
        }
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

    if (params.status) {
        if (queries === '') { queries += `WHERE status = '${params.status}'` }
        else {
            queries += `AND status = '${params.status}'`
        }
    }

    return filter + " " + queries + " ORDER BY id ASC";
}
