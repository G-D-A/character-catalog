class Artifacts {
    constructor(
        public name: string,
        public type: string,
        public strength: number,
        public rarity: number
    ) {}

    static fromApiData(data: any): Artifacts {
        return new Artifacts(
            data || 'Unknown',
            data.type || 'Generic',
            Math.floor(Math.random() * 100) + 1,
            data.rarity || 1
        );
    }
}
export { Artifacts };
