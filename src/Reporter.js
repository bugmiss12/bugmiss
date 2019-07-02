export default class Reporter {
    constructor({bugmissApi, receiver, collector, intervalSeconds, delaySeconds}) {
        this.bugmissApi = bugmissApi;
        this.receiver = receiver;
        this.collector = collector;
        this.intervalSeconds = intervalSeconds;
        this.delaySeconds = delaySeconds;
    }

    async start() {
        setTimeout(async () => {
            await this.run();
        }, this.delaySeconds);
    }

    async run() {
        let log_items = this.receiver.pull();
        if (log_items) {
            try {
                // 上报日志
                await this.bugmissApi.report(log_items);
            } catch(e) {
                // 失败写回日志
                this.collector.unshift(log_items);
            }
        }

        this.timeout = setTimeout(async () => {
            await this.run();
        }, this.intervalSeconds);
    }
}