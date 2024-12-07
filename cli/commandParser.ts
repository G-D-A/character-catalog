import prompts from 'prompts';
import { ApiClient } from '../infra/apiClient';
import { DataRepository } from '../infra/dataRepository';
import { Character } from '../core/character';
import { Enemies } from '../core/enemies';
import { Artifacts } from '../core/artifacts';
import { Bosses } from '../core/bosses';
import { Nations } from '../core/nations';
import { Consumable } from '../core/consumable';
import { Elements } from '../core/elements';
import { ICommand } from './commands/ICommand';
import { HelpCommand } from './commands/HelpCommand';
import { ViewCharactersCommand } from './commands/ViewCharactersCommand';
import { ViewEnemiesCommand } from './commands/ViewEnemiesCommand';
import { ViewArtifactsCommand } from './commands/ViewArtifactsCommand';
import { ViewBossesCommand } from './commands/ViewBossesCommand';
import { ViewNationsCommand } from './commands/ViewNationsCommand';
import { ViewConsumablesCommand } from './commands/ViewConsumablesCommand';
import { ViewElementsCommand } from './commands/ViewElementsCommand';
import { ViewCharacterByNameCommand } from './commands/ViewCharacterByNameCommand';
import { ViewCharacterCardCommand } from './commands/ViewCharacterCardCommand'
import { ViewEnemyByNameCommand } from './commands/ViewEnemyByNameCommand';
import { ViewWeaponsCommand } from './commands/ViewWeaponsCommand';
import { EquipWeaponCommand } from './commands/EquipWeaponCommand';
import { ExitCommand } from './commands/ExitCommand';


export class CommandParser {
    private continueRunning: { value: boolean };
    private commands: Map<string, ICommand> = new Map();
    private charactersRepository: DataRepository<Character[]>;
    private enemiesRepository: DataRepository<Enemies[]>;
    private characters: Character[] = [];
    private enemies: Enemies[] = [];
    private artifacts: Artifacts[] = [];
    private bosses: Bosses[] = [];
    private nations: Nations[] = [];
    private consumables: Consumable[] = [];
    private elements: Elements[] = [];
    private apiClient = new ApiClient();

    constructor() {
        this.continueRunning = { value: true };

        this.charactersRepository = new DataRepository('./data/characters.json');
        this.enemiesRepository = new DataRepository('./data/enemies.json');

        this.registerCommand('help', new HelpCommand(this.commands));
        this.registerCommand('viewCharacters', new ViewCharactersCommand(this.apiClient, this.characters));
        this.registerCommand('viewCharacterByName', new ViewCharacterByNameCommand(this.characters));
        this.registerCommand('viewCharacterCard', new ViewCharacterCardCommand(this.apiClient, this.characters));
        this.registerCommand('viewEnemies', new ViewEnemiesCommand(this.apiClient, this.enemies));
        this.registerCommand('viewEnemyByName', new ViewEnemyByNameCommand(this.enemies));
        this.registerCommand('viewArtifacts', new ViewArtifactsCommand(this.apiClient, this.artifacts));
        this.registerCommand('viewBosses', new ViewBossesCommand(this.apiClient, this.bosses));
        this.registerCommand('viewNations', new ViewNationsCommand(this.apiClient, this.nations));
        this.registerCommand('viewConsumables', new ViewConsumablesCommand(this.apiClient, this.consumables));
        this.registerCommand('viewElements', new ViewElementsCommand(this.apiClient, this.elements));
        this.registerCommand('viewWeapons', new ViewWeaponsCommand(this.apiClient));
        this.registerCommand('equipWeapon', new EquipWeaponCommand(this.apiClient, this.characters));
        this.registerCommand('exit', new ExitCommand(this.continueRunning));
    }

    private registerCommand(name: string, command: ICommand) {
        this.commands.set(name, command);
    }

    async startCLI() {
        while (this.continueRunning.value) {
            const response = await prompts({
                type: 'select',
                name: 'command',
                message: 'Choose a command',
                choices: Array.from(this.commands.keys()).map((key) => ({
                    title: this.formatCommandName(key),
                    value: key,
                })),
            });

            const selectedCommand = this.commands.get(response.command);
            if (selectedCommand) {
                await selectedCommand.execute();
            } else {
                console.log('Unknown command. Type "help" for a list of available commands.');
            }
        }
    }
    private formatCommandName(commandName: string): string {
        return commandName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .trim();
    }
}
