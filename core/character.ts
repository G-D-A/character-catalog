class Character {
    public currentWeapon: any;

    constructor(
        public name: string,
        private _health: number,
        public attackPower: number,
        public defense: number,
        public resist: number,
        public level: number,
        public rarity: number
    ) {}

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value >= 0 ? value : 0;
    }

    attack(target: Character): string {
        const damage = Math.max(0, this.attackPower - target.defense);
        target.health -= damage;
        return `${this.name} attacked ${target.name} for ${damage} damage`;
    }

    equipWeapon(weapon: any) {
        this.currentWeapon = weapon;
        console.log(`${this.name} equipped with ${weapon}`);
    }

    static fromApiData(data: any): Character {
        return new Character(
            data || 'Unknown',
            Math.floor(Math.random() * 300) + 1,
            Math.floor(Math.random() * 200) + 1,
            Math.floor(Math.random() * 150) + 1,
            Math.floor(Math.random() * 222) + 1,
            Math.floor(Math.random() * 10) + 1,
            Math.floor(Math.random() * 500) + 1
        );
    }
}

export { Character };
