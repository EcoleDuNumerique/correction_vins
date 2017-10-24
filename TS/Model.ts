export abstract class Model {

    protected id: number;
    protected $dom: JQuery;

    constructor( id:number ){
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    //!Important
    abstract display( $parent: JQuery ): void;

}