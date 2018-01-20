import Module from './Module';
export default class Installer{
    constructor(){
        this.app = window.DIARY;
        this.store = this.app.$store;
        this.router = this.app.$router;
        
        this.install();
    }
    install(){
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
            this.store.registerModule(store.name, store);
        });
    }
    registerRoutes(){
        this.router.addRoutes(this.getRoutes());
    }
    registerModule(){
        const title = this.getTitle();
        let   module = new Module(title);
        
        this.getTabs().forEach(tab=>{ 
            module.addTab(tab);
        });
        this.getWidgets().forEach(widget=>{
            module.addWidget(widget);
        });

        const uid = module.uid;
        
        this.store.commit('modules/add', module);
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