export default class MemoryCache {
    constructor() {
        this.data = [];
    }

    lpush(log_items) {
        this.data = this.data.concat(log_items);
    }

    rpush(log_items) {
        this.data = log_items.concat(this.data);
    }

    lpull(num) {
        return this.data.splice(0, num);
    }
}