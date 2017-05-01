namespace Departures {
    export class DepartureList {
        private url: string;
        private departures: Heap<Departure>;
        private departureCount = 0;

        constructor() {
            this.departures = new Heap<Departure>();
            this.url = sourceUrl;
            this.requestDepartures();
        }

        private requestDepartures() {
            let xhr = new XMLHttpRequest();
            let list = this;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        list.resolveResponse(JSON.parse(xhr.response))
                    } else {
                        list.rejectResponse(xhr.response)
                    }
                }
            }
            xhr.open("GET", this.url, false)
            xhr.send()
        }

        private resolveResponse(data: any) {
            for (let stop of data) {
                this.departures.insert(new Departure(
                    stop.dest, stop.id, stop.info, stop.line, stop.route,
                    stop.rtime, stop.stop, stop.stopname, stop.time));
                this.departureCount += 1;
            }
        }

        private rejectResponse(response: string) {

        }

        public print(container: HTMLDivElement) {
            let htmlText = "<table class='departures-body'>";
            let count = Math.min(25, this.departureCount);
            for (let i = 0; i < count; i += 1) {
                let departure = this.departures.remove();
                htmlText += "<tr><td class='time'>" + departure.time + "</td><td class='line'>" + departure.line
                + "</td><td class='destination'>" + departure.destination + "</td><td class='stop'>" + departure.stopname
                + "</td></tr>";
            }
            htmlText += "</table>";

            container.innerHTML = htmlText;
        }
    }
}