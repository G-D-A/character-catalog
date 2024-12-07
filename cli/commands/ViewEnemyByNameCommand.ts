import { ICommand } from './ICommand';
import { Enemies } from '../../core/enemies';
import prompts from 'prompts';

export class ViewEnemyByNameCommand implements ICommand {
    constructor(private enemies: Enemies[]) {}

    // Fetch and display enemy details by name
    async execute(): Promise<void> {
        const response = await prompts({
            type: 'text',
            name: 'enemyName',
            message: 'Enter the name of the enemy to view:',
        });

        const selectedEnemy = this.enemies.find(enemy => enemy.name === response.enemyName);

        if (selectedEnemy) {
            console.log(`Enemy details: ${JSON.stringify(selectedEnemy, null, 2)}`);
        } else {
            console.log(`Enemy named "${response.enemyName}" not found.`);
        }
    }

    // Return command description
    getDescription(): string {
        return 'View details of an enemy by name';
    }
}
