namespace Departures {
    export class Departure implements Comparable<Departure> {
        constructor(private dest: string, private id: string, private info: string,
                private line_: string, private route: string, private rtime: string,
                private stop: string, private stopname_: string, private time_: number) {}
        
        get destination() {
            return this.dest;
        }

        get line() {
            return this.line_;
        }

        get stopname() {
            return this.stopname_;
        }

        get time() {
            return LocalDate.getHHMM(this.time_);
        }

        compareTo(other: Departure) {
            return other.time_ - this.time_;
        }
    }
}