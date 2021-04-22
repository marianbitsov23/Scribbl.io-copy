import axios from 'axios';

const API_URL = "http://localhost:8080/api/language";

class LanguageService {
    create = language => axios.post(API_URL, {name: language.name});

    getAll = () => axios.get(API_URL);
}

export default new LanguageService();