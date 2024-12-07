import { ICommand } from './ICommand';
import { ApiClient } from '../../infra/apiClient';
import { Enemies } from '../../core/enemies';

export class ViewEnemiesCommand implements ICommand {
    constructor(private apiClient: ApiClient, private enemies: Enemies[]) {}

    // Fetch and display enemies
    async execute(): Promise<void> {
        const apiEnemies = await this.apiClient.fetchEnemies();
        for (let i = 0; i < apiEnemies.length; i++) {
            const formattedEnemy = Enemies.fromApiData(apiEnemies[i]);
            this.enemies.push(formattedEnemy);
        }
        console.log('Enemies from API:');
        this.enemies.forEach((enemy) => {
            console.log(`
            Name: ${enemy.name}
            Health: ${enemy.health}
            Attack Power: ${enemy.attackPower}
            Defense: ${enemy.defense}
            Angry: ${enemy.angry}
            Threat Level: ${enemy.threatLevel}
        `);
        });
    }

    // Return command description
    getDescription(): string {
        return 'View all enemies';
    }
}
