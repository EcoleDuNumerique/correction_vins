import { App } from "./App";
import { Product } from "./Product";
import { Vendor } from "./Vendor";

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

$(document).on("click", ".vendor", function(){

    let id_vendeur:number = $(this).data("vendor");
    let vendor: Vendor = app.getVendorById( id_vendeur );
    app.displayProductsByVendor( vendor );

});

$("a").click(function(event){

    event.preventDefault();

    var targetId:string = $(this).attr("href");
    var $target:JQuery = $("#" + targetId);

    $(".page").hide();
    $target.show();

});