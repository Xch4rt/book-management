import axios from "axios";

class APIService {
    private axiosInstance;

    constructor (baseURL: string) {
        this.axiosInstance = axios.create ({
            baseURL
        });
    }

    async login (data: any) {
        try {
            const response = await this.axiosInstance.post('/login', data);
            return response.data;
        } catch (error) {
            throw new Error('Error with the request');
        }
    }

    async signup (data: any) {
        try {
            const response = await this.axiosInstance.post('/register', data);
            return response.data;
        } catch (error) {
            throw new Error('Error with the request');
        }
    }
}

export default APIService;