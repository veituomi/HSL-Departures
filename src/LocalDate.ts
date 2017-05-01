namespace Departures {
    export class LocalDate {
        private static getTime(): number {
            return new Date().getTime();
        }

        static getAccurateTime(): string {
            return new Date(LocalDate.getTime() + 36e5 * 3).toISOString().slice(-13, -5);
        }

        static getHHMM(time: number): string {
            return new Date(time * 1000 + 36e5 * 3).toISOString().slice(-13, -8);
        }
    }
}