import Module from './Module';
import Uninstaller from './Uninstaller';

export default class Installer{
    constructor(vueAppInstance){
        this.app = vueAppInstance;
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
    registerStores(){
        this.getStores().forEach(store=>{
            this.store.registerModule(store.name, store);
        });
    }
    registerRoutes(){
        this.router.addRoutes(this.getRoutes());
    }
    makeModule(){
        const title = this.getTitle();
        const module = new Module(title);
        
        this.getTabs().forEach(tab=>{ 
            module.addTab(tab);
        });
        this.getWidgets().forEach(widget=>{
            module.addWidget(widget);
        });
        const uninstaller = new class extends Uninstaller {
          beforeActions() {
            this.uninstallBefore();
          }
          afterActions() {
            this.uninstallAfter();
          }
        }(this.app, module);
        module.setUninstaller(uninstaller);
        
        return module;
    }
    registerModule(){
        const module = this.makeModule();        
        this.store.commit('apiModules/add', module);
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


    // NOTE: Methods below are like abstract methods which need to be implemented by whoever extends this class
    // Only required method is getTitle
 
    // para implementar
    // this.getTitle é obrigatorio
    beforeActions(){}
    afterActions(){}
    uninstallBefore(){}
    uninstallAfter(){}
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
