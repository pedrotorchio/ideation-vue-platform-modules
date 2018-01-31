export default class Uninstaller{
    constructor(module){
        this.module = module;
        this.app = window.DIARY;
        this.store = this.app.$store;
        this.router = this.app.$router;
    }
    run(){
        console.log(this);
        this.beforeActions();
        this.registerRoutes();
        this.registerStores();
        this.registerModule();
        this.afterActions();
    }
    beforeActions(){}
    registerStores(){
        this.getStores().forEach(store=>{
            this.store.unregisterModule(store.name, store);
        });
    }
    registerRoutes(){}
    registerModule(){
        this.store.commit('modules/remove', this.module);
    }
    afterActions(){}
}