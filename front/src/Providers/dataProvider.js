import {stringify} from 'query-string';
import axios from 'axios';
import config from '../config.json'
export default {
    getList: (resource, params) => {
        return new Promise((resolve, reject) => {
            let { pagination, sort, filter } = params
            axios.get(config.URLback + `/` + resource + `?pagination=${JSON.stringify(pagination)}&sort=${JSON.stringify(sort)}&filter=${JSON.stringify(filter)}`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject("Nenhum elemento foi encontrado. Tente novamente mais tarde!");
                })
        })
    },

    getOne: (resource, params) => {
        return new Promise((resolve, reject) => {
            axios.get(config.URLback + `/` + resource + `/${params.id}`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject("Nenhum elemento foi encontrado.");
                })
        })
    },

    getMany: (resource, params) => {
        return new Promise((resolve, reject) => {
            const query = {
                filter: JSON.stringify({id: params.ids}),
            };
            axios.get(`${config.URLback}/${resource}?${stringify(query)}`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },

    delete: (resource, params) => {
        return new Promise((resolve, reject) => {
            axios.delete(config.URLback + `/` + resource + `/${params.id}`, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },

    getManyReference: (resource, params) => {
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
        // const url = `${config.URLback}${resource}?${stringify(query)}`;
        //
        // return httpClient(config.URLback).then(({headers, json}) => ({
        //     data: json,
        //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
        // }));
    },

    update: (resource, params) => {
        return new Promise((resolve, reject) => {
            axios.put(config.URLback + `/` + resource + `/${params.id}`, params.data, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                })
        })
    },

    create: (resource, params) => {
        return new Promise((resolve, reject) => {
            axios.post(config.URLback + `/` + resource, params.data, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
                .then((response) => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
};
