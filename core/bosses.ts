class Bosses {
    constructor(
        public name: string,
        private _health: number,
        public attackPower: number,
        public defense: number,
        public angry: number,
        public weakness: string
    ) {}

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value >= 0 ? value : 0;
    }

    static fromApiData(data: any): Bosses {
        return new Bosses(
            data || 'Unknown',
            data.health || 1000,
            data.attackPower || 99,
            data.defense || 50,
            Math.floor(Math.random() * 1000) + 1,
            data.weakness || 'None'
        );
    }
}

export { Bosses };
