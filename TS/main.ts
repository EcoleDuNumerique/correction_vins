import { App } from "./App";
import { Product } from "./Product";
import { Vendor } from "./Vendor";

var app:App = new App();

$(document).on("dragover", ".container", function(event){
    event.preventDefault();
});

$(document).on("dragstart", ".item", function(event){   
    
    const dragEvent: DragEvent = event.originalEvent as DragEvent;
    dragEvent.dataTransfer.setData( "id", $(this).data("product") );

});

//Event container fixe de droite
app.$sented_container.on("drop", function(event){

    const dragEvent: DragEvent = event.originalEvent as DragEvent;
    let id_product: number = parseInt( dragEvent.dataTransfer.getData("id") );
    let product: Product = app.getProductById( id_product );
    app.getCurrentVendor().addProduct( product );
    $(this).append( product.get$Dom() );

});

//Event container des categorie
$(document).on("drop", ".container-cat", function(event){

    const dragEvent: DragEvent = event.originalEvent as DragEvent;
    let id_product: number = parseInt( dragEvent.dataTransfer.getData("id") );
    let product: Product = app.getProductById( id_product );
    app.getCurrentVendor().removeProduct( product );
    product.getCategory().get$Dom()
        .append( product.get$Dom() );

});

$(document).on("click", ".vendor", function(){

    let id_vendeur:number = $(this).data("vendor");
    let vendor: Vendor = app.getVendorById( id_vendeur );
    app.setCurrentVendor( vendor );
    app.displayProductsByVendor( app.getCurrentVendor() );

});

$("a").click(function(event){

    event.preventDefault();

    var targetId:string = $(this).attr("href");
    var $target:JQuery = $("#" + targetId);

    $(".page").hide();
    $target.show();

});