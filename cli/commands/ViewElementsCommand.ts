import { ICommand } from './ICommand';
import { ApiClient } from '../../infra/apiClient';
import { Elements } from '../../core/elements';

export class ViewElementsCommand implements ICommand {
    constructor(private apiClient: ApiClient, private elements: Elements[]) {}

    // Fetch and display elements
    async execute(): Promise<void> {
        const apiElements = await this.apiClient.fetchElements();
        for (let i = 0; i < apiElements.length; i++) {
            const formattedElements = Elements.fromApiData(apiElements[i]);
            this.elements.push(formattedElements);
        }
        console.log('Elements from API:');
        this.elements.forEach((element) => {
            console.log(`
            Name: ${element.name}
            Power: ${element.power}
            Count: ${element.count}
            Affinity: ${element.affinity}
        `);
        });
    }

    // Return command description
    getDescription(): string {
        return 'View all elements';
    }
}
