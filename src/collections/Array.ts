interface Array<T> {
    /** Returns a cloned array. */
    clone(): Array<T>;
    /** Joins the values of the array into a string.
     * @param delimiters Strings between values. These take turns in order. If omitted a comma will be used as in standard JavaScript.
    */
    join(...delimiters: string[]): string;
    /** Changes the order in the array randomly. */
    shuffle(): Array<T>;
    /** Swaps elements in the array.
     * @param indexA Index to an element that has to be swapped.
     * @param indexB Another index to an element that has to be swapped.
     */
    swap(indexA: number, indexB: number): Array<T>;
}

Array.prototype.clone = function<T>(): Array<T> {
    return this.slice(0);
}

Array.prototype.join = function (...delimiters: string[]): string {
    let r: string = this[0];
    if (delimiters.length == 0) {
        delimiters.push(",");
    }
    for (let i = 1; i < this.length; ++i) {
        r += delimiters[(i - 1) % delimiters.length] + this[i];
    }
    return r;
}

Array.prototype.shuffle = function <T>(): Array<T> {
    for (let i = 0; i < this.length; ++i) {
        this.swap(i, Math.floor(Math.random() * this.length));
    }
    return this;
}

Array.prototype.swap = function<T>(indexA: number, indexB: number): Array<T> {
    let temp = this[indexA];
    this[indexA] = this[indexB];
    this[indexB] = temp;
    return this;
}