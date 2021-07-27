import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

class API {
    #token = "";
    #user = null; 
    #endpoint = "http://localhost:1337/"
    
    constructor() {
        const t = localStorage.getItem("token");
        if (t) this.#token = t; 
    }

    #performCall(url, method, data) {
        console.log("Calling " + url, this.#token);

        let request = { headers: {}, method: method };
        if (this.#token) request.headers.Authorization = "Bearer " + this.#token; 

        if (data) request.data = data; 

        return new Promise((resolve, reject) => {
            axios(this.#endpoint + url, request )
                .then(res => {
                    if (res.status == 200) resolve(res.data);
                    else (reject.res.statusText);
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status == 404) reject("Daten konnten nicht gefunden werden: " + err.response.config.url);
                        if (err.response.status == 401) reject("Kein Zugriff, bitte loggen Sie sich ein!");
                        else reject("Konnte nicht vom Backend lesen: " + err.response.statusText);
                    } else if (err.request) {
                        reject("Konnte nicht auf den Backend Server verbinden!");
                    } else {
                        reject("Ein Unbekannter Fehler ist passiert! " + err);
                    }
                });
        });
    }


    getSongs() {
        return this.#performCall('lieds', 'get');
    }

    login(user, password) {
        return this.#performCall("auth/local", 'post', { 'identifier': user, 'password': password })
        .then( (token) => {
            this.#token = token.jwt;
            this.#user = token.user; 
            localStorage.setItem("token", this.#token);
            return true
        });
    }

    async isLoggedIn() {
        console.log("Is Logged In: " + this.#token ,this.#user)
        if (this.#user) return Promise.resolve(true); 
        
        if (this.#token) {
            return this.#performCall("users/me", 'get')
            .then( (res) => {
                console.log(this.#token);
                this.#user = res.user; 
                return true; 
            })
            .catch( () => false )
        } else {
            return Promise.resolve(false); 
        }
    }

    logout() {
        this.#user = null;
        this.#token = null; 
        localStorage.removeItem('token');
        console.log("Cleared token.");
    }



}

export default new API();