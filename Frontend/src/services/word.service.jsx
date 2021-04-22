import axios from 'axios';

const API_URL = "http://localhost:8080/api/word";

class WordService {
    create = word => axios.post(API_URL, {name: word.name, language: word.language});
    getAll = () => axios.get(API_URL);
}

export default new WordService();