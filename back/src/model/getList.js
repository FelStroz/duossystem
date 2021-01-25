module.exports = async (Model, queryData = {}, qFieldDefault = 'name') => {
    let { pagination, sort, filter: filters, populate, startDate, endDate } = queryData;

    try { pagination = JSON.parse(pagination) } catch (e) { if(!pagination) pagination = {} };
    try { sort = JSON.parse(sort) } catch (e) { if(!sort) sort = {} };
    try { filters = JSON.parse(filters) } catch (e) { if(!filters) filters = {} };

    let { page = 1, perPage = 0 } = pagination;
    let { field = 'createdAt', order } = sort;
    let { q, qField } = filters;

    if (field === '') field = 'createdAt';

    let query = q ? {
        [qField || qFieldDefault]: {
            $regex: q,
            $options: "i"
        }
    }: {};

    delete filters['q'];
    delete filters['qField'];

    if(startDate || endDate){
        let baseDate = new Date(startDate), lastDate = new Date(endDate);
        if(startDate == "undefined")
            baseDate = new Date('01-01-1700');
        if(endDate == "undefined")
            lastDate = new Date();

        console.log(baseDate, lastDate, "-------------")
        query = {
            ...query,
            date: {$gte: baseDate, $lte: lastDate},
        }
    }

    for(let filter in filters) {
        query = {
            ...query,
            [filter]: (typeof filters[filter] === 'string')? { $regex: filters[filter], $options: "i" }: filters[filter]
        };
    }

    let total = await Model.countDocuments(query).catch(err => Promise.reject(err));
    let data = await Model.find(query).limit(parseInt(perPage)).skip(perPage * (page - 1)).sort({[field]: order}).populate(populate).catch(err => Promise.reject(err));

    return { data, total };
};
