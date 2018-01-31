export default class Uninstaller{
    constructor(){
        this.app = window.DIARY;
        this.store = this.app.$store;
        this.router = this.app.$router;
    }
    run(){
        this.beforeActions();
        this.registerRoutes();
        this.registerStores();
        this.registerModule();
        this.dispatches();
        this.afterActions();
    }
    beforeActions(){}
    registerStores(){
        this.getStores().forEach(store=>{
            this.store.unregisterModule(store.name, store);
        });
    }
    registerRoutes(){}
    mountModule(){
        const title = this.getTitle();
        let   module = new Module(title);
        
        this.getTabs().forEach(tab=>{ 
            module.addTab(tab);
        });
        this.getWidgets().forEach(widget=>{
            module.addWidget(widget);
        });

        return module;
    }
    registerModule(){
        const module = this.mountModule();        
        this.store.commit('modules/remove', module);
    }
    dispatches(){

        this.getDispatches().forEach(argument => {
            let action, payload;

            if(Array.isArray(argument)){
                [action, payload] = argument;
            }
            else{
                action = argument;
                payload = null;           
            }
            this.store.dispatch(action, payload);
        });
    }
    afterActions(){}

    // para implementar
    // this.getTitle é obrigatorio
    getTitle(){
        return '';
    }
    getRoutes(){
        return [];
    }
    getStores(){
        return [];
    }
    getTabs(){
        return [];
    }
    getWidgets(){
        return [];
    }
    getDispatches(){
        return [];
    }
}