class Consumable {
    constructor(
        public name: string,
        public count: number,
        public effect: string
    ) {}

    static fromApiData(data: any): Consumable {
        return new Consumable(
            data || 'Unknown',
            Math.floor(Math.random() * 50) + 1,
            data.effect || 'Generic Effect'
        );
    }
}
export { Consumable };
