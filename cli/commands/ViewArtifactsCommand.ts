import { ICommand } from './ICommand';
import { ApiClient } from '../../infra/apiClient';
import { Artifacts } from '../../core/artifacts';

export class ViewArtifactsCommand implements ICommand {
    constructor(private apiClient: ApiClient, private artifacts: Artifacts[]) {}

    // Fetch and display artifacts
    async execute(): Promise<void> {
        const apiArtifacts = await this.apiClient.fetchArtifacts();
        for (let i = 0; i < apiArtifacts.length; i++) {
            const formattedArtifacts = Artifacts.fromApiData(apiArtifacts[i]);
            this.artifacts.push(formattedArtifacts);
        }
        console.log('Artifacts from API:');
        this.artifacts.forEach((artifact) => {
            console.log(`
            Name: ${artifact.name}
            Type: ${artifact.type}
            Strength: ${artifact.strength}
            Rarity: ${artifact.rarity}
        `);
        });
    }

    // Return command description
    getDescription(): string {
        return 'View all artifacts';
    }
}
