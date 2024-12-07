import { ICommand } from './ICommand';

export class HelpCommand implements ICommand {
    private commands: Map<string, ICommand>;

    constructor(commands: Map<string, ICommand>) {
        this.commands = commands;
    }

    // Display all available commands
    async execute(): Promise<void> {
        console.log('Available commands:');
        this.commands.forEach((command, name) => {
            console.log(`- ${name}: ${command.getDescription()}`);
        });
    }

    // Return command description
    getDescription(): string {
        return 'Show a list of all available commands';
    }
}
