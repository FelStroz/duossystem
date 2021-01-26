import axios from 'axios';
import config from '../../config.json';

export default {
    getList: (resource, params) => {
        if(resource === 'users')
            resource = 'admin/users'
        if(resource === 'clients')
            resource = 'clients?populate=services'
        if(resource === 'cars' || resource === undefined)
            if(params.filter.timeInterval){
                resource = `cars?populate=client&startDate=${params.filter.timeInterval.startDate}&endDate=${params.filter.timeInterval.endDate}`
                delete params.filter.timeInterval;
            }
            else
                resource = 'cars?populate=client'
        if(resource === 'create-service'){
            resource = 'cars?populate=client&timestamp=day';
            params.pagination.perPage = 3;
        }

        return new Promise((resolve, reject) => {
            axios.get(`${config.backUrl}/${resource}`, {
                headers: {authorization: `Bearer ${localStorage.getItem("authToken")}`},
                params: params
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    // console.log(e.response.data);
                    return e.response ? reject(e.response.data.error.completeMessage) : reject(e.message);
                })
        })
    },

    getOne: (resource, params) => {
        let populate = "";
        if(resource === 'users')
            resource = 'admin/users'
        if(resource === 'clients')
            populate = '?populate=services'
        if(resource === 'cars')
            populate = '?populate=client'
        if(resource === 'plates'){
            populate = `?licensePlate=${params.licensePlate}`
            return new Promise((resolve, reject) => {
                axios.get(`${config.backUrl}/${resource}${populate}`, {headers: {authorization: `Bearer ${localStorage.getItem("authToken")}`}})
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch(e => {
                        return e.response ? reject(e.response.data.error.completeMessage) : reject(e.message);
                    })
            })
        }
        return new Promise((resolve, reject) => {
            axios.get(`${config.backUrl}/${resource}/${params.id}/${populate}`, {headers: {authorization: `Bearer ${localStorage.getItem("authToken")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    return e.response ? reject(e.response.data.error.completeMessage) : reject(e.message);
                })
        })
    },

    getMany: (resource, params) => {
        if(resource === 'users')
            resource = 'admin/users'
        return new Promise((resolve, reject) => {
            axios.get(`${config.backUrl}/${resource}`, {
                headers: {authorization: `Bearer ${localStorage.getItem("authToken")}`},
                params: {id: params.ids}
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    return e.response ? reject(e.response.data.error.completeMessage) : reject(e.message);
                })
        })
    },

    delete: (resource, params) => {
        if(resource === 'users')
            resource = 'admin/users'
        return new Promise((resolve, reject) => {
            axios.delete(`${config.backUrl}/${resource}/${params.id}`, {headers: {authorization: `Bearer ${localStorage.getItem("authToken")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    return e.response ? reject(e.response.data.error.completeMessage) : reject(e.message);
                })
        })
    },

    // getManyReference: (resource, params) => {
        // const {page, perPage} = params.pagination;
        // const {field, order} = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify({
        //         ...params.filter,
        //         [params.target]: params.id,
        //     }),
        // };
        // const url = `${process.env.REACT_APP_API_HOST}${resource}?${stringify(query)}`;
        //
        // return httpClient(process.env.REACT_APP_API_HOST).then(({headers, json}) => ({
        //     data: json,
        //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
        // }));
    // },

    update: (resource, params) => {
        if (resource === 'users')
            resource = 'admin/users'
        if (params.data.birthday){
            let date = new Date(params.data.birthday);
            params.data.birthday = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
        }

        if (params.data.fouls){
            params.data.fouls.map((foul) => {
                let date = new Date(foul.date);
                foul.date = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
            });
        }

        return new Promise((resolve, reject) => {
            axios.put(`${config.backUrl}/${resource}/${params.id}`, params.data, {headers: {authorization: `Bearer ${localStorage.getItem("authToken")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    return e.response ? reject(e.response.data.error.completeMessage) : reject(e.message);
                })
        })
    },

    create: (resource, params) => {
        if(resource === 'users')
            resource = 'admin/users'
        if(resource === 'create-service'){
            resource = 'cars';
            if(params.data.id)
                params.data.client = params.data.id;
        }
        // if(resource === 'products'){
        //     let dados = new FormData();
        //     dados.append('photo', params.data.photo.rawFile);
        //     dados.append('name', params.data.name);
        //     dados.append('tecnicalInformation', params.data.tecnicalInformation);
        //     dados.append('quantityInStock', params.data.quantityInStock);
        //     dados.append('price', params.data.price);
        //     dados.append('description', params.data.description);
        //     dados.append('category', params.data.category);
        //     return new Promise((resolve, reject) => {
        //         axios.post(`${config.backUrl}/${resource}`, dados, {
        //             headers: {
        //                 authorization: `Bearer ${localStorage.getItem("authToken")}`,
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         })
        //             .then((response) => {
        //                 resolve(response.data);
        //             })
        //             .catch(error => {
        //                 reject(error);
        //             })
        //     })
        // }
        if(params.data.birthday){
            let date = new Date(params.data.birthday);
            params.data.birthday = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
        }
        return new Promise((resolve, reject) => {
            axios.post(`${config.backUrl}/${resource}`, params.data, {headers: {authorization: `Bearer ${localStorage.getItem("authToken")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(e => {
                    // console.log(e);
                    return e.response ? reject(e.response.data.error.completeMessage) : reject(e.message);
                })
        })
    },
};
