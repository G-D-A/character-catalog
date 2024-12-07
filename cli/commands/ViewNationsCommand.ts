import { ICommand } from './ICommand';
import { ApiClient } from '../../infra/apiClient';
import { Nations } from '../../core/nations';

export class ViewNationsCommand implements ICommand {
    constructor(private apiClient: ApiClient, private nations: Nations[]) {}

    // Fetch and display nations
    async execute(): Promise<void> {
        const apiNations = await this.apiClient.fetchNation();
        for (let i = 0; i < apiNations.length; i++) {
            const formattedNations = Nations.fromApiData(apiNations[i]);
            this.nations.push(formattedNations);
        }
        console.log('Nations from API:');
        this.nations.forEach((nation) => {
            console.log(`
            Name: ${nation.name}
            Population: ${nation.population}
        `);
        });
    }

    // Return command description
    getDescription(): string {
        return 'View all nations';
    }
}
