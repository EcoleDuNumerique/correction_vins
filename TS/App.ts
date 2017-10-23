export class App {

    public $item: JQuery;
    public $container: JQuery;

    constructor(){
        this.$item = $(".item");
        this.$item.prop("draggable", true);
        this.$container = $(".container");
    }

}