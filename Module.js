import Base from './Base';

export default class Module extends Base{
    constructor(title){
        super(title);
        
        this.sidetabs = [];
        this.widgets = [];
        this.routes = [];
        this.uninstaller = null;
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
    setUninstaller(uninstaller) {
        this.uninstaller = uninstaller;
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
    uninstall() {
        if (this.uninstaller) this.uninstaller.run();
        else return false;
        return true;
    }
}
