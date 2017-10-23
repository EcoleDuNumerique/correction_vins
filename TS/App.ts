import { Product } from "./Product";
import { BDD } from "./BDD";
import { Category } from "./Category";

export class App {

    public $item: JQuery;
    public $container: JQuery;

    private categories: Category[];
    private all_products: Product[];

    constructor(){
        this.$item = $(".item");
        this.$item.prop("draggable", true);
        this.$container = $(".container");

        this.getAllProducts();
    }

    getAllProducts(): void {
        
        let products: {
            id: number,
            name: string,
            categoryId: number
        }[] = BDD.products;

        for ( let product of products ){
            let the_product: Product = new Product(
                product.id,
                product.name,
                this.getCategoryById( product.categoryId )
            );
            this.all_products.push( the_product );
        }

    }

    getCategoryById( id:number ): Category{
        //blabla boucle 
    }

}