import axios from 'axios';
import config from '../config.json';

if (!localStorage.getItem("token"))
    localStorage.setItem("not_authenticated", true);

export default {
    login: ({ username, password }) => {
        return new Promise((resolve, reject) => {
            axios.post(`${config.URLback}/login`, {
                email: username,
                password: password
            }).then((response) => {
                    localStorage.setItem("username", username)
                    localStorage.setItem("token", response.data.token);
                    localStorage.removeItem("not_authenticated");
                    return resolve();
            }).catch((e) => {
                return reject("Credenciais inválidas");
            })
        });
        // accept all username/password combinations
        //  localStorage.setItem("username", username)
        // localStorage.setItem("token", 123123)
        //  localStorage.removeItem("not_authenticated");
        //  return Promise.resolve();
    },
    logout: () => {
        localStorage.setItem("not_authenticated", true);
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        return Promise.resolve();
    },
    checkError: ( data ) => {
        let {status} = data;
        if (status === 401 || status === 403) {
            return Promise.reject("Não Autorizado");
        }
        if(status === 409){
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem("not_authenticated")
            ? Promise.reject("Não autorizado! Você não possui autorização para acessar essa informação!")
            : Promise.resolve();
    },
    getPermissions: () => {
       return Promise.resolve() //permisão pra qualquer usuario
    },
};
