export default class Uninstaller{
    constructor(vueAppInstance, module){
        this.module = module;
        this.app = vueAppInstance;
        this.store = this.app.$store;
        this.router = this.app.$router;
    }
    run(){
        this.beforeActions();
        this.unregisterRoutes();
        this.unregisterStores();
        this.unregisterModule();
        this.afterActions();
    }
    unregisterStores(){
        this.getStores().forEach(store=>{
            this.store.unregisterModule(store.name, store);
        });
    }
    unregisterRoutes(){}
    unregisterModule(){
        this.store.commit('modules/remove', this.module);
    }
    beforeActions(){}
    afterActions(){}
}
