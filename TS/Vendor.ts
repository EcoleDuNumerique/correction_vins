import { Product } from "./Product";
import { Model } from "./Model";

export class Vendor extends Model {
   
    protected $dom: JQuery;

    private products: Product[];
    
    removeProductById( id:number ){

        for( let key in this.products ){

            let product: Product = this.products[key];
            if( product.getId() == id ){
                let nkey:number = parseInt( key );
                this.products.slice( nkey, 1 );
                return;
            }

        }

    }

    display($parent: JQuery): void {
        
    }


}