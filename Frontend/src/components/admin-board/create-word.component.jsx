import { TextField, Button, Container, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import languageService from '../../services/language.service';
import wordService from '../../services/word.service';

export default function CreateWord() {
    const [word, setWord] = useState("");
    const [languages, setLanguages] = useState([]);
    const [languageIndex, setLanguageIndex] = useState(0);

    useEffect(() => {
        languageService.getAll()
        .then(result => setLanguages(result.data))
    }, []);

    const saveWord = () => {
        wordService.create({name: word, language: languages[languageIndex]});
    }

    const isInvalid = word === "";

    return(
        <Container>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Enter word"
                name="language"
                type="text"
                onChange={event => setWord(event.target.value)}
            />
            <div>
                <InputLabel>
                    Language
                </InputLabel>

                <Select
                    fullWidth
                    defaultValue={languages[languageIndex]}
                    onChange={event => setLanguageIndex(event.target.value)}
                >
                    {languages.map((language, index) => (
                        <MenuItem key={index} value={index}>
                            {language.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <Button
                variant="contained"
                color="primary"
                disabled={isInvalid}
                onClick={() => saveWord()}
            >
                Add Word
            </Button>
        </Container>
    )
}