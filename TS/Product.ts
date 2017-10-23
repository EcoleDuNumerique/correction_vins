import { Category } from "./Category";
import { Model } from "./Model";

export class Product extends Model {

    private name:string;
    private category: Category;
    protected $dom: JQuery;

    constructor( id: number, name:string, category: Category ){
        super(id);
        this.name = name;
        this.category = category;
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