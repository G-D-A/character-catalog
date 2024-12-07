import { ICommand } from './ICommand';
import { ApiClient } from '../../infra/apiClient';
import { Character } from '../../core/character';
import { ImageRepository } from '../../infra/imageRepository';

export class ViewCharactersCommand implements ICommand {
    private imageRepo: ImageRepository;
    constructor(private apiClient: ApiClient, private characters: Character[]) {
        this.imageRepo = new ImageRepository();
    }

    // Fetch and display characters
    async execute(): Promise<void> {
        const apiCharacters = await this.apiClient.fetchCharacters();
        for (let i = 0; i < apiCharacters.length; i++) {
            const formattedCharacter = Character.fromApiData(apiCharacters[i]);
            this.characters.push(formattedCharacter);
        }
        console.log('Characters list:');
        this.characters.forEach((char) => {
            console.log(`
            Name: ${char.name}
            Health: ${char.health}
            Attack Power: ${char.attackPower}
            Defense: ${char.defense}
            Resist: ${char.resist}
            Level: ${char.level}
            Rarity: ${char.rarity}
        `);
        });
    }

    // Return command description
    getDescription(): string {
        return 'View all characters';
    }
}

