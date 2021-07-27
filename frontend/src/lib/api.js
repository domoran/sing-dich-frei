import axios from 'axios';
import axiosRetry from 'axios-retry';
import { ref } from 'vue'

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

class API {
    #token = "";
    #endpoint = "http://localhost:1337/"
    #loggedIn = ref(null); 
    #user = null; 
    
    constructor() {
        const t = localStorage.getItem("token");
        if (t) this.#token = t;
        this.isLoggedIn(); // trigger login state on startup
    }

    async #performCall(url, method, data) {
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

    async getSongs() {
        return this.#performCall('lieds', 'get');
    }

    async login(user, password) {
        return this.#performCall("auth/local", 'post', { 'identifier': user, 'password': password })
        .then( (token) => {
            this.#token = token.jwt;
            this.#user = token.user;
            this.#loggedIn.value = true;  
            localStorage.setItem("token", this.#token);
            return true
        });
    }

    async getNextMeeting() {
        return this.#performCall("treffens?_sort=Zeit:DESC&_limit=1", 'get')
        .then( resp => {
            if (!resp) return null; 
            return resp[0]; 
        }); 
    }

    async isLoggedIn() {
        if (this.#user) return Promise.resolve(true); 
        
        if (this.#token) {
            return this.#performCall("users/me", 'get')
            .then( (res) => {
                console.log(this.#token);
                this.#user = res.user; 
                this.#loggedIn.value = true;
                return true; 
            })
            .catch( () => {
                this.logout();
            } )
        } else {
            return Promise.resolve(false); 
        }
    }

    logout() {
        this.#user = null;
        this.#token = null; 
        this.#loggedIn.value = false; 
        localStorage.removeItem('token');
        console.log("Cleared token.");
    }

    getLoggedInState() {
        return this.#loggedIn; 
    }



}

export default new API();