export interface ICommand {
    // Execute the command
    execute(): Promise<void>;

    // Get the description of the command
    getDescription(): string;
}
