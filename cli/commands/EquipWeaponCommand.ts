import { ICommand } from './ICommand';
import { Character } from '../../core/character';
import { ApiClient } from '../../infra/apiClient';
import prompts from 'prompts';

export class EquipWeaponCommand implements ICommand {
    constructor(
        private apiClient: ApiClient,
        private characters: Character[]
    ) {}

    // Equip weapon logic
    async execute(): Promise<void> {
        // Ensure characters are loaded
        if (this.characters.length === 0) {
            console.log('No characters available. Please load characters first.');
            return;
        }

        // Fetch weapons from API
        const weapons = await this.apiClient.fetchWeapons();
        if (!weapons || weapons.length === 0) {
            console.log('No weapons available from the API.');
            return;
        }

        // Prompt user to select a character
        const characterResponse = await prompts({
            type: 'select',
            name: 'characterIndex',
            message: 'Select a character to equip with a weapon:',
            choices: this.characters.map((char, index) => ({
                title: char.name,
                value: index,
            })),
        });

        if (characterResponse.characterIndex === undefined) {
            console.log('No character selected.');
            return;
        }

        const selectedCharacter = this.characters[characterResponse.characterIndex];

        // Prompt user to select a weapon
        const weaponResponse = await prompts({
            type: 'select',
            name: 'weaponIndex',
            message: 'Select a weapon:',
            choices: weapons.map((weapon, index) => ({
                title: `${weapon}`,
                value: index,
            })),
        });

        if (weaponResponse.weaponIndex === undefined) {
            console.log('No weapon selected.');
            return;
        }

        const selectedWeapon = weapons[weaponResponse.weaponIndex];

        // Equip weapon
        selectedCharacter.equipWeapon(selectedWeapon);

        console.log('='.repeat(40));
        console.log(`Character "${selectedCharacter.name}" successfully equipped with weapon "${selectedWeapon}".`);
        console.log('='.repeat(40));
    }

    // Command description
    getDescription(): string {
        return 'Equip a weapon to a character';
    }
}
