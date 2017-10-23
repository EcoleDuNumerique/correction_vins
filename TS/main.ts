import { App } from "./App";
import { Product } from "./Product";

var app:App = new App();

app.$container.on("dragover", function(event){
    event.preventDefault();
});

app.$item.on("dragstart", function(event){

    const dragEvent: DragEvent = event.originalEvent as DragEvent;
    dragEvent.dataTransfer.setData( "id", $(this).attr("id") );

});

app.$container.on("drop", function(event){

    const dragEvent: DragEvent = event.originalEvent as DragEvent;
    const id: string = dragEvent.dataTransfer.getData("id");
    const $element: JQuery = $("#"+id);
    const containerId: string = $(this).attr("id");

    if( $(this).hasClass("vendor") ){
        $(this).append( $element );
    }
    else if( $element.hasClass( containerId ) ){
        $(this).append( $element );
    }

});

