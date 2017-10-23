export abstract class Model {

    private id: number;

    constructor( id:number ){
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    //!Important
    protected abstract $dom: JQuery;
    abstract display( $parent: JQuery ): void;

}