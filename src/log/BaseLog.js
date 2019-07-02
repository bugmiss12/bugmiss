export default class BaseLog {
    constructor({device_info, user_info, page_info}) {
        this.device_info = device_info;
        this.user_info = user_info;
        this.page_info = page_info;
    }
}