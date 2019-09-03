export class APIResult {
    constructor(
        public message: string,
        public status: number = 1,
        public data?: any
    ) {}
}
export class APIError extends Error {
    constructor(message: string, public status: number = 0) {
        super();
        this.message = message;
    }
}
