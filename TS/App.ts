import { Product } from "./Product";
import { BDD } from "./BDD";
import { Category } from "./Category";
import { Vendor } from "./Vendor";

export class App {

    public $item: JQuery;
    public $container: JQuery;
    public $category_container: JQuery;
    public $all_vendors: JQuery;

    private categories: Category[];
    private all_products: Product[];
    private vendors: Vendor[];

    constructor(){

        this.$item = $(".item");
        this.$item.prop("draggable", true);
        this.$container = $(".container");
        this.$category_container = $("#shop-list");
        this.$all_vendors = $("#all-vendors");

        this.categories = [];
        this.all_products = [];
        this.vendors = [];

        this.getAllCategories();
        this.getAllProducts();
        this.getAllVendors();

        this.displayCategories();
        this.displayVendors();

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

    getAllCategories(): void {

        let categories: { 
            id:number, 
            name:string
        }[] = BDD.categories;

        for( let category of categories ){

            let the_category: Category = new Category(
                category.id,
                category.name
            );
            this.categories.push( the_category );
        }

    }

    getCategoryById( id:number ): Category {
        
        for( let category of this.categories ){

            if( id == category.getId() ){
                return category;
            }

        }

        return null;

    }

    getAllVendors(): void {

        //On recupere les vendors de la bdd ! ( fausse base de donnée BDD)
        let vendors: {
            id: number,
            name: string,
            products: number[]
        }[] = BDD.vendors;

        //On boucle sur cette liste de vendeurs
        for( let vendor of vendors ){

            //On va avoir besoin d'un tableau de produit
            let vendors_products:Product[] = [];

            //Je boucle sur le tableau d'id de vendor.products
            for( let product_id of vendor.products ){

                //Je cherche le produit correspondant, grace a son id, dans ma liste de produit
                let the_product:Product = this.getProductById( product_id );

                //Je pousse mon tableau d'objet
                vendors_products.push( the_product );
            }

            //Ici, on créer le vendeur avec sa classe et le tableau de produit créé !
            let the_vendor:Vendor = new Vendor(
                vendor.id,
                vendor.name,
                vendors_products
            )

            //j'ajoute mon vendeur a ma liste de vendeur de mon app
            this.vendors.push( the_vendor );

        }

    }

    getProductById( id: number ): Product{

        for( let product of this.all_products ){

            if( id == product.getId() ){
                return product;
            }

        }

        return null;

    }

    displayCategories(){

        for( let category of this.categories ){
            category.display( this.$category_container );
        }

    }

    displayVendors(){

        for( let vendor of this.vendors ){
            vendor.display( this.$all_vendors );
        }
        
    }

}