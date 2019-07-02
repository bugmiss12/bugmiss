export default class BaseApi {
    constructor({sourceFn, deviceFn, userFn}) {
        this.sourceFn = sourceFn;
        this.deviceFn = deviceFn;
        this.userFn = userFn;
    }

    async base() {
        return {
            device_info: await this.deviceFn(),
            user_info: await this.userFn(),
            page_info: await this.sourceFn()
        }
    }
}