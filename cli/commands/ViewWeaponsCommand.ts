import { ICommand } from './ICommand';
import { ApiClient } from '../../infra/apiClient';

export class ViewWeaponsCommand implements ICommand {
    constructor(private apiClient: ApiClient) {}

    // Fetch and display available weapons
    async execute(): Promise<void> {
        const weapons = await this.apiClient.fetchWeapons();
        if (weapons.length === 0) {
            console.log('No weapons available from the API.');
        } else {
            console.log('Weapons from API:', weapons);
        }
    }

    // Return command description
    getDescription(): string {
        return 'View all available weapons';
    }
}
