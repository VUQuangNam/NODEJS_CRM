module.exports = (params) => {
    console.log(params);
    let queries = '';
    const filter = `SELECT customers.*,
    COALESCE(json_agg(orders.*)
    FILTER(WHERE orders.id IS NOT NULL),null)
    AS orders FROM customers LEFT JOIN orders
    ON CAST(customers.id AS TEXT) = orders.create_by :: json ->> 'id'`
    if (params.keyword) {
        queries += `WHERE  CAST(customers.id AS TEXT) ILIKE '%${params.keyword}%' OR  customers.name || ' '|| customers.username  ILIKE '%${params.keyword}%' `;
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

    if (params.customer_id) {
        queries += `WHERE CAST(customers.id AS TEXT) = '${params.customer_id}' `;
    }

    return filter + " " + queries + " GROUP BY customers.id, customers.name ORDER BY id ASC";

}
