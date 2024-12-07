import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { DataRepository } from '../infra/dataRepository';
import { ApiClient } from '../infra/apiClient';
import { Character } from '../core/character';

// init
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const publicDir = path.join(__dirname, '../web/src');
app.use(express.static(publicDir));


const characterRepository = new DataRepository<Character[]>('./data/characters.json');
const apiClient = new ApiClient();

app.get('/characters', async (req: Request, res: Response): Promise<void> => {
    try {
        let characters = characterRepository.load();

        if (!characters || characters.length === 0) {
            console.log('Fetching characters from API...');
            const apiCharacters = await apiClient.fetchCharacters();
            characters = apiCharacters.map(data => Character.fromApiData(data));
            characterRepository.save(characters);
        }

        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching characters' });
    }
});

app.get('/characters/:name', async (req: Request<{ name: string }>, res: Response): Promise<void> => {
    try {
        const { name } = req.params;
        const characters = characterRepository.load();

        if (!characters) {
            res.status(404).json({ message: 'No characters found.' });
            return;
        }
        const character = characters.find(char => char.name.toLowerCase() === name.toLowerCase());
        if (!character) {
            res.status(404).json({ message: `Character ${name} not found.` });
            return;
        }

        res.json(character);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching character' });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
