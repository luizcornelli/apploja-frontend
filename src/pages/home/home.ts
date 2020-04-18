import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciais: CredenciaisDTO = {
    
    email:"", 
    senha:""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login() {
    console.log(this.credenciais);
    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillEnter() { 
    
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){ 

    this.menu.swipeEnable(true);
  }

}
