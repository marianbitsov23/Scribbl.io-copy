import { TextField, Button, Container } from '@material-ui/core';
import React, { useState } from 'react';
import languageService from '../../services/language.service';

export default function CreateLanguage() {
    const [language, setLanguage] = useState("");

    const saveLanguage = () => {
        languageService.create({name: language});
    }

    const isInvalid = language === "";

    return(
        <Container>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Enter language"
                name="language"
                type="text"
                onChange={event => setLanguage(event.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                disabled={isInvalid}
                onClick={() => saveLanguage()}
            >
                Add language
            </Button>
        </Container>
    )
}