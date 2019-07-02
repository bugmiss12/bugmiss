export default class Collector {
    constructor(cache, filter) {
        this.cache = cache;
        this.filter = filter;
    }

    async rpush(log_item) {
        if (!log_item) {
            return;
        }
        if (this.filter && !filter.match(log_item)) return;
        await this.cache.rpush(log_item);
    }

    async lpush(log_items) {
        if (!log_items) {
            return;
        }
        await this.cache.lpush(log_items);
    }
}