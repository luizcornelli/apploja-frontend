import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { PedidoDTO } from "../../models/pedido.dto";

@Injectable()
export class PedidoService{

    constructor(public http: HttpClient) {

    }

    insert(obj: PedidoDTO){

        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`, 
            obj, 
            {
                observe: 'response', 
                // A resposta vai ter um corpo vazio por isso colocamos text se não vai ser feito um parse no vazio e vai dar erro
                responseType: 'text' 
            }
            );
    }
}