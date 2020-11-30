module.exports = async (Model, queryData = {}, qFieldDefault = 'name') => {
    let { pagination, sort, filter: filters, populate } = queryData;

    try { pagination = JSON.parse(pagination) } catch (e) {};
    try { sort = JSON.parse(sort) } catch (e) {};
    try { filters = JSON.parse(filters) } catch (e) {};

    let { page = 1, perPage = 0 } = pagination;
    let { field , order } = sort;
    let { q, qField } = filters;

    let query = q ? {
        [qField || qFieldDefault]: {
            $regex: q,
            $options: "i"
        }
    }: {};

    delete filters['q'];
    delete filters['qField'];

    for(let filter in filters) {
        query = {
            ...query,
            [filter]: filters[filter]
        };
    }

    let total = await Model.countDocuments(query).catch(err => Promise.reject(err));
    let data = await Model.find(query).limit(parseInt(perPage)).skip(perPage * (page - 1)).sort({[field]: order}).populate(populate).catch(err => Promise.reject(err));

    return { data, total };
};
