import { ICommand } from './ICommand';
import { ApiClient } from '../../infra/apiClient';
import { Bosses } from '../../core/bosses';

export class ViewBossesCommand implements ICommand {
    constructor(private apiClient: ApiClient, private bosses: Bosses[]) {}

    // Fetch and display bosses
    async execute(): Promise<void> {
        const apiBosses = await this.apiClient.fetchBosses();
        for (let i = 0; i < apiBosses.length; i++) {
            const formattedBoss = Bosses.fromApiData(apiBosses[i]);
            this.bosses.push(formattedBoss);
        }
        console.log('Bosses from API:');
        this.bosses.forEach((boss) => {
            console.log(`
            Name: ${boss.name}
            Health: ${boss.health}
            Attack Power: ${boss.attackPower}
            Defense: ${boss.defense}
            Angry: ${boss.angry}
            Weakness: ${boss.weakness}
        `);
        });
    }

    // Return command description
    getDescription(): string {
        return 'View all bosses';
    }
}
