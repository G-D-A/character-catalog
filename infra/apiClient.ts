import axios from 'axios';

export class ApiClient {
    private baseURL: string = 'https://genshin.jmp.blue/';

    async fetchCharacters(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.baseURL}characters`);
            return response.data;
        } catch (error) {
            console.error('Error fetching characters:', error);
            return [];
        }
    }

    async fetchEnemies(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.baseURL}enemies`);
            return response.data;
        } catch (error) {
            console.error('Error fetching enemies:', error);
            return [];
        }
    }

    async fetchArtifacts(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.baseURL}artifacts`);
            return response.data;
        } catch (error) {
            console.error('Error fetching artifacts:', error);
            return [];
        }
    }

    async fetchBosses(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.baseURL}boss`);
            return response.data;
        } catch (error) {
            console.error('Error fetching bosses:', error);
            return [];
        }
    }

    async fetchElements(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.baseURL}elements`);
            return response.data;
        } catch (error) {
            console.error('Error fetching elements:', error);
            return [];
        }
    }

    async fetchConsumable(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.baseURL}consumables`);
            return response.data;
        } catch (error) {
            console.error('Error fetching consumables:', error);
            return [];
        }
    }

    async fetchNation(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.baseURL}nations`);
            return response.data;
        } catch (error) {
            console.error('Error fetching nations:', error);
            return [];
        }
    }

    async fetchWeapons(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.baseURL}weapons`);
            return response.data;
        } catch (error) {
            console.error('Error fetching weapons:', error);
            return [];
        }
    }

    async fetchCharacterImage(characterName: string): Promise<Buffer> {
        try {
            const uri = `${this.baseURL}characters/${characterName}/card`;
            const response = await axios.get(uri, { responseType: 'arraybuffer' });
            return response.data;
        } catch (error) {
            console.error(`Error fetching image for ${characterName}:`, error);
            throw new Error(`Failed to fetch image for ${characterName}`);
        }
    }
}
