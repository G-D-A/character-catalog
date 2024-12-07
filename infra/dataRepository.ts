import fs from 'fs';
import path from 'path';

class DataRepository<T> {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    save(data: T): void {
        const directory = path.dirname(this.filePath);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    load(): T | null {
        if (fs.existsSync(this.filePath)) {
            const fileData = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(fileData) as T;
        }
        return null;
    }
}

export { DataRepository };
