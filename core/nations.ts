class Nations {
    constructor(
        public name: string,
        public population: number
    ) {}

    static fromApiData(data: any): Nations {
        return new Nations(data, Math.floor(Math.random() * 100000) + 1);
    }
}
export { Nations };
