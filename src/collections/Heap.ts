namespace Departures {
    export class Heap<T extends Comparable<T>> {
        /** @internal */
        private comparator: (l: T, r: T) => number;
        /** @internal */
        private list: Array<T>;

        /** @internal */
        private parent = (i: number) => Math.floor((i + 1) / 2 - 1);
        /** @internal */
        private left = (i: number) => 2 * (i + 1) - 1;
        /** @internal */
        private right = (i: number) => 2 * (i + 1);

        /** Initializes a new heap data structure.
         * @param comparator Function that should return more than 0 if l is more significant than r.
         */
        constructor(comparator: (l: T, r: T) => number = (l: T, r: T) => l.compareTo(r)) {
            this.list = [];
            this.comparator = comparator;
        }

        /** Inserts the given value in the heap.
         * @param value Value to be inserted.
         */
        insert(value: T): Heap<T> {
            let i = this.list.push(value) - 1;
            while (i > 0 && this.compare(i, this.parent(i)) > 0) {
                this.list.swap(i, this.parent(i));
                i = this.parent(i);
            }
            return this;
        }

        /** Returns the most significant value in the heap. */
        peek(): T {
            return this.list[0];
        }

        /** Removes the most significant value from the heap and returns it. */
        remove(): T {
            let max = this.list[0];
            this.list[0] = this.list.pop();
            this.heapify(0);
            return max;
        }

        /** @internal */
        private heapify(i: number): void {
            let l = this.left(i);
            let r = this.right(i);
            if (r < this.list.length) {
                let g = this.compare(l, r) > 0 ? l : r;
                this.compareSwapHeapify(i, g);
            } else if (l < this.list.length) {
                this.compareSwapHeapify(i, l);
            }
        }

        /** @internal */
        private compareSwapHeapify(i: number, j: number): void {
            if (this.compare(i, j) < 0) {
                this.list.swap(i, j);
                this.heapify(j);
            }
        }

        /** @internal */
        private compare(i: number, n: number): number {
            return this.comparator(this.list[i], this.list[n]);
        }
    }
}