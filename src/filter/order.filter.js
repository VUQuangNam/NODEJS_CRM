module.exports = (params) => {
    let queries = '';
    const filter = `SELECT * FROM orders `
    if (params.keyword) {
        queries += `WHERE  CAST(id AS TEXT) ILIKE '%${params.keyword}%'  `;
    }

    if (params.status) {
        if (queries === '') { queries += `WHERE status = '${params.status}'` }
        else {
            queries += `AND status = '${params.status}'`
        }
    }
    return filter + " " + queries + " ORDER BY id ASC";
}
