import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export class ImageRepository {
    private imageDir: string;

    constructor(directory: string = './assets/images') {
        this.imageDir = directory;
        // Ensure the directory exists
        if (!fs.existsSync(this.imageDir)) {
            fs.mkdirSync(this.imageDir, { recursive: true });
        }
    }

    // Check if the image exists locally
    isImageCached(imageName: string): boolean {
        const filePath = path.join(this.imageDir, imageName);
        return fs.existsSync(filePath);
    }

    // Save the image locally
    saveImage(imageName: string, imageData: Buffer): string {
        const filePath = path.join(this.imageDir, imageName);

        try {
            fs.writeFileSync(filePath, imageData);
            console.log(`Image saved at: ${filePath}`);
            return filePath;
        } catch (error) {
            console.error(`Error saving image "${imageName}":`, error);
            throw new Error(`Failed to save image "${imageName}"`);
        }
    }

    // Get the path of a cached image
    getImagePath(imageName: string): string {
        return path.join(this.imageDir, imageName);
    }

    openFile(filePath: string) {
        const command = process.platform === 'win32' ? `start "" "${filePath}"` :
            process.platform === 'darwin' ? `open "${filePath}"` :
                `xdg-open "${filePath}"`;

        exec(command, (err) => {
            if (err) {
                console.error(`Failed to open file: ${filePath}`, err);
            }
        });
    };
}
