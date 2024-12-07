import { ICommand } from './ICommand';
import { Character } from '../../core/character';
import prompts from 'prompts';

export class ViewCharacterByNameCommand implements ICommand {
    constructor(private characters: Character[]) {}

    // Fetch and display character details by name
    async execute(): Promise<void> {
        const response = await prompts({
            type: 'text',
            name: 'characterName',
            message: 'Enter the name of the character to view:',
        });

        const selectedCharacter = this.characters.find(char => char.name === response.characterName);

        if (selectedCharacter) {
            console.log(`Character details: ${JSON.stringify(selectedCharacter, null, 2)}`);
        } else {
            console.log(`Character named "${response.characterName}" not found.`);
        }
    }

    // Return command description
    getDescription(): string {
        return 'View details of a character by name';
    }
}
