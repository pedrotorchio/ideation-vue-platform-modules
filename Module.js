import Base from './Base';

export default class Module extends Base{
    constructor(title){
        super(title);
        
        this.sidetabs = [];
        this.widgets = [];
        this.routes = [];
        this.uninstall = ()=>false;
    }
    addTab(tab){
        tab.module = this.uid;
        if(tab.title == null)
            tab.setTitle(this.title);

        this.sidetabs.push(tab);

        return this;
    }
    addWidget(widget){
        widget.module = this.uid;
        if(widget.title == null)
            widget.setTitle(this.title);

        this.widgets.push(widget);

        return this;
    }
    getUid(){
        return this.uid;
    }
    getSideTabs(){
        return this.sidetabs;
    }
    getWidgets(){
        return this.widgets;
    }
}