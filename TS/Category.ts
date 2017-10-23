import { Model } from "./Model";

export class Category extends Model {

    protected $dom: JQuery;

    private name: string;

    constructor(id:number, name:string){
        super( id );
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    display($parent: JQuery): void {
        
    }

}