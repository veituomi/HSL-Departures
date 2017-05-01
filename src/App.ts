namespace Departures {
    export class App {
        static main(): void {
            App.refreshClock();
            App.refreshDepartures();
        }

        static refreshDepartures(): void {
            let departures = new DepartureList();
            departures.print(<HTMLDivElement>document.getElementById("nextDeparturesContainer"));
            setTimeout(App.refreshDepartures, 10000);
        }

        static refreshClock(): void {
            document.getElementById("infoContainer").innerHTML = LocalDate.getAccurateTime();
            setTimeout(App.refreshClock, 500);
        }
    }
}