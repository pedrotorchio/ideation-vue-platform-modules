export default class Base{
    constructor(title, extra){
        this.setTitle(title);
        this.extra = extra || {};
    }
    setTitle(title){
        this.title = title;
        this.uid = btoa(title);
    }
}