import { Product } from "./Product";
import { BDD } from "./BDD";
import { Category } from "./Category";
import { Vendor } from "./Vendor";
import { APIService } from "./APIService";

export class App {

    public $item: JQuery;
    public $container: JQuery;
    public $category_container: JQuery;
    public $all_vendors: JQuery;
    public $sented_container: JQuery;

    private categories: Category[];
    private all_products: Product[];
    private vendors: Vendor[];
    private currentVendor: Vendor;

    constructor(){

        this.$item = $(".item");
        this.$item.prop("draggable", true);
        this.$container = $(".container");
        this.$category_container = $("#shop-list");
        this.$all_vendors = $("#all-vendors");
        this.$sented_container = $("#sended-products");

        this.categories = [];
        this.all_products = [];
        this.vendors = [];

        this.getAllCategories();
        this.getAllProducts();
        this.getAllVendors();

        this.displayCategories();
        this.displayVendors();

        if( this.vendors.length > 0 ){
            this.currentVendor = this.vendors[0];
            this.displayProductsByVendor( this.currentVendor );
        }

    }

    getCurrentVendor():Vendor {
        return this.currentVendor;
    }

    setCurrentVendor( vendor:Vendor ){
        this.currentVendor = vendor;
    }

    getAllProducts(): void {
        
        var api:APIService = APIService.getService();
        let products:Promise<any> = api.getWines();

        products
            .then(( products ) => {
                
                for ( let product of products ){
                    let the_product: Product = new Product(
                        product.id,
                        product.name,
                        this.getCategoryById( product.categoryId )
                    );
                    this.all_products.push( the_product );
                }

            })
            .catch((error) => {
                console.log(error);
            })

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

    getProductById( id: number ): Product {

        for( let product of this.all_products ){

            if( id == product.getId() ){
                return product;
            }

        }

        return null;

    }

    displayCategories(): void {

        for( let category of this.categories ){
            category.display( this.$category_container );
        }

    }

    displayVendors(): void {

        for( let vendor of this.vendors ){
            vendor.display( this.$all_vendors );
        }

    }

    clearBoard(): void {
        this.$sented_container.html("");
        for( let category of this.categories ){
            category.get$Dom().html("");
        }
    }

    displayProductsByVendor( vendor:Vendor ):void {

        this.clearBoard();

        //On cherche quels sont les produits vendu et non-vendu
        for( let product of this.all_products ){

            let flag:boolean = false;//true = vendu, false = non-vendu

            for( let vproduct of vendor.getProducts() ){

                if( vproduct.getId() == product.getId() ){
                    //On a trouvé l'élément !
                    flag = true;
                }

            }

            if( flag == true ){
                //affichage colonne droite
                product.display( this.$sented_container );
            }
            else {
                //affichage colonne gauche
                let category: Category = product.getCategory();
                product.display( category.get$Dom() );
            }


        }

    }

    getVendorById( id_vendor:number ):Vendor {

        for( let vendor of this.vendors ){

            if( vendor.getId() == id_vendor ){
                return vendor;
            }

        }

        return null;

    }

}