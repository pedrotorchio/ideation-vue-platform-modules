import Installer from './Installer';

export default class Uninstaller extends Installer{
    constructor(){
        super();
    }
    run(){
        super.install();
    }
    registerStores(){
        this.getStores().forEach(store=>{
            this.store.unregisterModule(store.name);
        });
    }
    registerRoutes(){}
    registerModule(){
        const module = this.mountModule();     
        this.store.commit('modules/remove', module);
    }
}