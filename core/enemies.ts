class Enemies {
    public currentWeapon: any;

    constructor(
        public name: string,
        private _health: number,
        public attackPower: number,
        public defense: number,
        public angry: number,
        public threatLevel: number
    ) {}

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value >= 0 ? value : 0;
    }

    static fromApiData(data: any): Enemies {
        return new Enemies(
            data.name || data,
            data.health || 100,
            data.attackPower || 10,
            data.defense || 5,
            Math.floor(Math.random() * 1000) + 1,
            data.threatLevel || 1
        );
    }
}
export { Enemies };
