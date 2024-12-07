import { ICommand } from './ICommand';

export class ExitCommand implements ICommand {
    private continueRunningRef: { value: boolean };

    constructor(continueRunningRef: { value: boolean }) {
        this.continueRunningRef = continueRunningRef;
    }

    // Execute the command to exit the CLI
    async execute(): Promise<void> {
        this.continueRunningRef.value = false;
        console.log('Exiting...');
    }

    // Return command description
    getDescription(): string {
        return 'Exit the CLI application';
    }
}
