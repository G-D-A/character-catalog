import prompts from 'prompts';

import { ICommand } from './ICommand';
import { ApiClient } from '../../infra/apiClient';
import { Character } from '../../core/character';
import { ImageRepository } from '../../infra/imageRepository';

export class ViewCharacterCardCommand implements ICommand {
    private imageRepo: ImageRepository;

    constructor(private apiClient: ApiClient, private characters: Character[]) {
        this.imageRepo = new ImageRepository();
    }

    // Fetch and display character card with image
    async execute(): Promise<void> {
        const response = await prompts({
            type: 'text',
            name: 'characterName',
            message: 'Enter the name of the character to view their card:',
        });

        const selectedCharacter = this.characters.find((char) => char.name === response.characterName);

        if (selectedCharacter) {
            const imageName = `${selectedCharacter.name}.jpg`;

            // Check and fetch image if not cached
            if (!this.imageRepo.isImageCached(imageName)) {
                console.log(`Downloading image for ${selectedCharacter.name}...`);
                const imageUrl = await this.apiClient.fetchCharacterImage(selectedCharacter.name);
                await this.imageRepo.saveImage(imageName, imageUrl);
            }
            const imagePath = this.imageRepo.getImagePath(imageName);
            console.log(`Character: ${selectedCharacter.name}`);
            console.log(`Image Path: ${imagePath}`);
            await this.imageRepo.openFile(imagePath);
        } else {
            console.log(`Character named "${response.characterName}" not found.`);
        }
    }

    // Return command description
    getDescription(): string {
        return 'View a character card with image by name.';
    }
}
