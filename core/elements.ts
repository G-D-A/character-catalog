class Elements {
    constructor(
        public name: string,
        public power: number,
        public count: number,
        public affinity: string
    ) {}

    static fromApiData(data: any): Elements {
        return new Elements(
            data || 'Unknown',
            Math.floor(Math.random() * 100) + 1,
            Math.floor(Math.random() * 50) + 1,
            data.affinity || 'Neutral'
        );
    }
}
export { Elements };
