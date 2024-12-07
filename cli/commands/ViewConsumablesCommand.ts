import { ICommand } from './ICommand';
import { ApiClient } from '../../infra/apiClient';
import { Consumable } from '../../core/consumable';

export class ViewConsumablesCommand implements ICommand {
    constructor(private apiClient: ApiClient, private consumables: Consumable[]) {}

    // Fetch and display consumables
    async execute(): Promise<void> {
        const consumables = await this.apiClient.fetchConsumable();
        for (let i = 0; i < consumables.length; i++) {
            const formattedConsumables = Consumable.fromApiData(consumables[i]);
            this.consumables.push(formattedConsumables);
        }
        console.log('Consumables from API:');
        this.consumables.forEach((consumable) => {
            console.log(`
            Name: ${consumable.name}
            Count: ${consumable.count}
            Effect: ${consumable.effect}
        `);
        });
    }

    // Return command description
    getDescription(): string {
        return 'View all consumables';
    }
}
