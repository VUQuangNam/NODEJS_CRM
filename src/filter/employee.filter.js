module.exports = (params) => {
    let queries = '';
    const filter = `SELECT * FROM employees `
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

    return filter + " " + queries + " ORDER BY id ASC";
}
