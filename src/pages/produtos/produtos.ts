import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens: ProdutoDTO[]; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService, 
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {

    let categoria_id = this.navParams.get('categoria_id');

    let loader = this.presentLoading();

    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.itens = response['content']; // Pegando o atributo content
        loader.dismiss(); 
        this.loadImageUrls();
      },
      error => { 
        loader.dismiss(); 
      }); 
  };

  loadImageUrls() {
    for(var i = 0; i < this.itens.length; i++){
      let item = this.itens[i]
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        }, 
        error => {});
    }
  }

  showDetail(produto_id: string){

    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

  presentLoading() {

    let loader = this.loadingController.create({
      
      content: 'Aguarde...', 
    });

    loader.present();
    return loader;
  }
}
