import { Category } from "./Category";

export class Product {

    private id:number;
    private name:string;
    private category: Category;
    private $dom: JQuery;

    constructor( id: number, name:string, category: Category ){
        this.id = id;
        this.name = name;
        this.category = category;
    }

    getId(): number {
        return this.id;
    }

    display( parent: JQuery ): void {

        let category_name:string = this.category.getName();
        let id:string =  category_name + this.id;
        let data_id: number = this.id;
        let div: string = "<div id='"+id+"' class='item "+category_name+"'></div>";

        this.$dom = $( div );
        parent.append( this.$dom );

    }

}