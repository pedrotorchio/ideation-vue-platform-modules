import Base from './Base';

export default class Element extends Base{
    constructor({icon, title, component, module, extra}){
        super(title, extra);
        this.icon = icon;
        this.component = component;
        this.module = module || null;
    }
}