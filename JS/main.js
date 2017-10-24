System.register("Model", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model;
    return {
        setters: [],
        execute: function () {
            Model = class Model {
                constructor(id) {
                    this.id = id;
                }
                getId() {
                    return this.id;
                }
                get$Dom() {
                    return this.$dom;
                }
            };
            exports_1("Model", Model);
        }
    };
});
System.register("Category", ["Model"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Model_1, Category;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }
        ],
        execute: function () {
            Category = class Category extends Model_1.Model {
                constructor(id, name) {
                    super(id);
                    this.name = name;
                }
                getName() {
                    return this.name;
                }
                display($parent) {
                    let div = "<div class='container' id='" + this.name + "' data-category=" + this.id + " ></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_2("Category", Category);
        }
    };
});
System.register("Product", ["Model"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Model_2, Product;
    return {
        setters: [
            function (Model_2_1) {
                Model_2 = Model_2_1;
            }
        ],
        execute: function () {
            Product = class Product extends Model_2.Model {
                constructor(id, name, category) {
                    super(id);
                    this.name = name;
                    this.category = category;
                }
                getCategory() {
                    return this.category;
                }
                display(parent) {
                    let category_name = this.category.getName();
                    let id = category_name + this.id;
                    let data_id = this.id;
                    let div = "<div id='" + id + "' class='item " + category_name + "'></div>";
                    this.$dom = $(div);
                    parent.append(this.$dom);
                }
            };
            exports_3("Product", Product);
        }
    };
});
System.register("BDD", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var BDD;
    return {
        setters: [],
        execute: function () {
            exports_4("BDD", BDD = {
                categories: [
                    {
                        id: 1,
                        name: "rouge"
                    },
                    {
                        id: 2,
                        name: "rose"
                    },
                    {
                        id: 3,
                        name: "blanc"
                    },
                ],
                products: [
                    {
                        id: 1,
                        name: "bordeaux",
                        categoryId: 1
                    },
                    {
                        id: 2,
                        name: "rivesalte",
                        categoryId: 2
                    },
                    {
                        id: 3,
                        name: "champagne",
                        categoryId: 3
                    }
                ],
                vendors: [
                    {
                        id: 1,
                        name: "Paul",
                        products: [1, 2]
                    },
                    {
                        id: 2,
                        name: "Jeremy",
                        products: [2]
                    },
                    {
                        id: 3,
                        name: "Stephane",
                        products: [3]
                    }
                ]
            });
        }
    };
});
System.register("Vendor", ["Model"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Model_3, Vendor;
    return {
        setters: [
            function (Model_3_1) {
                Model_3 = Model_3_1;
            }
        ],
        execute: function () {
            Vendor = class Vendor extends Model_3.Model {
                constructor(id, name, products) {
                    super(id);
                    this.name = name;
                    this.products = products;
                }
                removeProductById(id) {
                    for (let key in this.products) {
                        let product = this.products[key];
                        if (product.getId() == id) {
                            let nkey = parseInt(key);
                            this.products.slice(nkey, 1);
                            return;
                        }
                    }
                }
                getProducts() {
                    return this.products;
                }
                display($parent) {
                    let div = "<div class='vendor' id='vendor" + this.id + "' data-vendor='" + this.id + "' >";
                    div += "<a href='detail'>";
                    div += this.name + "</a></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                }
            };
            exports_5("Vendor", Vendor);
        }
    };
});
System.register("App", ["Product", "BDD", "Category", "Vendor"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Product_1, BDD_1, Category_1, Vendor_1, App;
    return {
        setters: [
            function (Product_1_1) {
                Product_1 = Product_1_1;
            },
            function (BDD_1_1) {
                BDD_1 = BDD_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (Vendor_1_1) {
                Vendor_1 = Vendor_1_1;
            }
        ],
        execute: function () {
            App = class App {
                constructor() {
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
                    if (this.vendors.length > 0)
                        this.displayProductsByVendor(this.vendors[0]);
                }
                getAllProducts() {
                    let products = BDD_1.BDD.products;
                    for (let product of products) {
                        let the_product = new Product_1.Product(product.id, product.name, this.getCategoryById(product.categoryId));
                        this.all_products.push(the_product);
                    }
                }
                getAllCategories() {
                    let categories = BDD_1.BDD.categories;
                    for (let category of categories) {
                        let the_category = new Category_1.Category(category.id, category.name);
                        this.categories.push(the_category);
                    }
                }
                getCategoryById(id) {
                    for (let category of this.categories) {
                        if (id == category.getId()) {
                            return category;
                        }
                    }
                    return null;
                }
                getAllVendors() {
                    //On recupere les vendors de la bdd ! ( fausse base de donnée BDD)
                    let vendors = BDD_1.BDD.vendors;
                    //On boucle sur cette liste de vendeurs
                    for (let vendor of vendors) {
                        //On va avoir besoin d'un tableau de produit
                        let vendors_products = [];
                        //Je boucle sur le tableau d'id de vendor.products
                        for (let product_id of vendor.products) {
                            //Je cherche le produit correspondant, grace a son id, dans ma liste de produit
                            let the_product = this.getProductById(product_id);
                            //Je pousse mon tableau d'objet
                            vendors_products.push(the_product);
                        }
                        //Ici, on créer le vendeur avec sa classe et le tableau de produit créé !
                        let the_vendor = new Vendor_1.Vendor(vendor.id, vendor.name, vendors_products);
                        //j'ajoute mon vendeur a ma liste de vendeur de mon app
                        this.vendors.push(the_vendor);
                    }
                }
                getProductById(id) {
                    for (let product of this.all_products) {
                        if (id == product.getId()) {
                            return product;
                        }
                    }
                    return null;
                }
                displayCategories() {
                    for (let category of this.categories) {
                        category.display(this.$category_container);
                    }
                }
                displayVendors() {
                    for (let vendor of this.vendors) {
                        vendor.display(this.$all_vendors);
                    }
                }
                clearBoard() {
                    this.$sented_container.html("");
                    for (let category of this.categories) {
                        category.get$Dom().html("");
                    }
                }
                displayProductsByVendor(vendor) {
                    this.clearBoard();
                    //On cherche quels sont les produits vendu et non-vendu
                    for (let product of this.all_products) {
                        let flag = false; //true = vendu, false = non-vendu
                        for (let vproduct of vendor.getProducts()) {
                            if (vproduct.getId() == product.getId()) {
                                //On a trouvé l'élément !
                                flag = true;
                            }
                        }
                        if (flag == true) {
                            //affichage colonne droite
                            product.display(this.$sented_container);
                        }
                        else {
                            //affichage colonne gauche
                            let category = product.getCategory();
                            product.display(category.get$Dom());
                        }
                    }
                }
                getVendorById(id_vendor) {
                    for (let vendor of this.vendors) {
                        if (vendor.getId() == id_vendor) {
                            return vendor;
                        }
                    }
                    return null;
                }
            };
            exports_6("App", App);
        }
    };
});
System.register("main", ["App"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var App_1, app;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            app = new App_1.App();
            app.$container.on("dragover", function (event) {
                event.preventDefault();
            });
            app.$item.on("dragstart", function (event) {
                const dragEvent = event.originalEvent;
                dragEvent.dataTransfer.setData("id", $(this).attr("id"));
            });
            app.$container.on("drop", function (event) {
                const dragEvent = event.originalEvent;
                const id = dragEvent.dataTransfer.getData("id");
                const $element = $("#" + id);
                const containerId = $(this).attr("id");
                if ($(this).hasClass("vendor")) {
                    $(this).append($element);
                }
                else if ($element.hasClass(containerId)) {
                    $(this).append($element);
                }
            });
            $(document).on("click", ".vendor", function () {
                let id_vendeur = $(this).data("vendor");
                let vendor = app.getVendorById(id_vendeur);
                app.displayProductsByVendor(vendor);
            });
            $("a").click(function (event) {
                event.preventDefault();
                var targetId = $(this).attr("href");
                var $target = $("#" + targetId);
                $(".page").hide();
                $target.show();
            });
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL01vZGVsLnRzIiwiVFMvQ2F0ZWdvcnkudHMiLCJUUy9Qcm9kdWN0LnRzIiwiVFMvQkRELnRzIiwiVFMvVmVuZG9yLnRzIiwiVFMvQXBwLnRzIiwiVFMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEsUUFBQTtnQkFLSSxZQUFhLEVBQVM7b0JBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixDQUFDO2dCQUVELEtBQUs7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsT0FBTztvQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDckIsQ0FBQzthQUtKLENBQUE7O1FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7WUNsQkYsV0FBQSxjQUFzQixTQUFRLGFBQUs7Z0JBSS9CLFlBQVksRUFBUyxFQUFFLElBQVc7b0JBQzlCLEtBQUssQ0FBRSxFQUFFLENBQUUsQ0FBQztvQkFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQztnQkFFRCxPQUFPO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixDQUFDO2dCQUVELE9BQU8sQ0FBQyxPQUFlO29CQUVuQixJQUFJLEdBQUcsR0FBVyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO29CQUN4RyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBRSxHQUFHLENBQUUsQ0FBQztvQkFDckIsT0FBTyxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7Z0JBRWhDLENBQUM7YUFFSixDQUFBOztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O1lDcEJGLFVBQUEsYUFBcUIsU0FBUSxhQUFLO2dCQU05QixZQUFhLEVBQVUsRUFBRSxJQUFXLEVBQUUs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O2dCQUMvQixDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUM7WUFFSCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7Z0JBRS9CLElBQUksVUFBVSxHQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9DLElBQUksTUFBTSxHQUFXLEdBQUcsQ0FBQyxhQUFhLENBQUUsVUFBVSxDQUFFLENBQUM7Z0JBQ3JELEdBQUcsQ0FBQyx1QkFBdUIsQ0FBRSxNQUFNLENBQUUsQ0FBQztZQUUxQyxDQUFDLENBQUMsQ0FBQztZQUVILENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxLQUFLO2dCQUV2QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRXZCLElBQUksUUFBUSxHQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNDLElBQUksT0FBTyxHQUFVLENBQUMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBRXZDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRW5CLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1vZGVsIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaWQ6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCAkZG9tOiBKUXVlcnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIGlkOm51bWJlciApe1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCREb20oKTogSlF1ZXJ5e1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRkb207XHJcbiAgICB9XHJcblxyXG4gICAgLy8hSW1wb3J0YW50XHJcbiAgICBhYnN0cmFjdCBkaXNwbGF5KCAkcGFyZW50OiBKUXVlcnkgKTogdm9pZDtcclxuXHJcbn0iLCJpbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBNb2RlbCB7XHJcblxyXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoIGlkICk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5KCRwYXJlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXY6IHN0cmluZyA9IFwiPGRpdiBjbGFzcz0nY29udGFpbmVyJyBpZD0nXCIgKyB0aGlzLm5hbWUgKyBcIicgZGF0YS1jYXRlZ29yeT1cIiArIHRoaXMuaWQgKyBcIiA+PC9kaXY+XCI7XHJcbiAgICAgICAgdGhpcy4kZG9tID0gJCggZGl2ICk7XHJcbiAgICAgICAgJHBhcmVudC5hcHBlbmQoIHRoaXMuJGRvbSApO1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCIuL0NhdGVnb3J5XCI7XHJcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgTW9kZWwge1xyXG5cclxuICAgIHByaXZhdGUgbmFtZTpzdHJpbmc7XHJcbiAgICBwcml2YXRlIGNhdGVnb3J5OiBDYXRlZ29yeTtcclxuICAgIHByb3RlY3RlZCAkZG9tOiBKUXVlcnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIGlkOiBudW1iZXIsIG5hbWU6c3RyaW5nLCBjYXRlZ29yeTogQ2F0ZWdvcnkgKXtcclxuICAgICAgICBzdXBlcihpZCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2F0ZWdvcnkoKTogQ2F0ZWdvcnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhdGVnb3J5O1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXkoIHBhcmVudDogSlF1ZXJ5ICk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgY2F0ZWdvcnlfbmFtZTpzdHJpbmcgPSB0aGlzLmNhdGVnb3J5LmdldE5hbWUoKTtcclxuICAgICAgICBsZXQgaWQ6c3RyaW5nID0gIGNhdGVnb3J5X25hbWUgKyB0aGlzLmlkO1xyXG4gICAgICAgIGxldCBkYXRhX2lkOiBudW1iZXIgPSB0aGlzLmlkO1xyXG4gICAgICAgIGxldCBkaXY6IHN0cmluZyA9IFwiPGRpdiBpZD0nXCIraWQrXCInIGNsYXNzPSdpdGVtIFwiK2NhdGVnb3J5X25hbWUrXCInPjwvZGl2PlwiO1xyXG5cclxuICAgICAgICB0aGlzLiRkb20gPSAkKCBkaXYgKTtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kKCB0aGlzLiRkb20gKTtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNvbnN0IEJERDp7IFxyXG4gICAgY2F0ZWdvcmllcyA6IHsgaWQ6bnVtYmVyLCBuYW1lOnN0cmluZ31bXSxcclxuICAgIHByb2R1Y3RzIDogeyBpZDpudW1iZXIsIG5hbWU6IHN0cmluZywgY2F0ZWdvcnlJZDogbnVtYmVyIH1bXSxcclxuICAgIHZlbmRvcnMgOiB7IGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcHJvZHVjdHM6IG51bWJlcltdIH1bXVxyXG4gfSBcclxuICAgID0ge1xyXG5cclxuICAgIGNhdGVnb3JpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiBcInJvdWdlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwicm9zZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICBuYW1lOiBcImJsYW5jXCJcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxuICAgIHByb2R1Y3RzIDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQgOiAxLFxyXG4gICAgICAgICAgICBuYW1lIDogXCJib3JkZWF1eFwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZCA6IDIsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcInJpdmVzYWx0ZVwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogMlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZCA6IDMsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcImNoYW1wYWduZVwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogM1xyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICB2ZW5kb3JzIDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiUGF1bFwiLFxyXG4gICAgICAgICAgICBwcm9kdWN0cyA6IFsgMSwgMiBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkplcmVteVwiLFxyXG4gICAgICAgICAgICBwcm9kdWN0cyA6IFsgMiBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlN0ZXBoYW5lXCIsXHJcbiAgICAgICAgICAgIHByb2R1Y3RzIDogWyAzIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgXVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFwiO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVuZG9yIGV4dGVuZHMgTW9kZWwge1xyXG4gICBcclxuICAgIHByb3RlY3RlZCAkZG9tOiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcHJvZHVjdHM6IFByb2R1Y3RbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggaWQ6bnVtYmVyLCBuYW1lOnN0cmluZywgcHJvZHVjdHM6UHJvZHVjdFtdICl7XHJcbiAgICAgICAgc3VwZXIoIGlkICk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RzID0gcHJvZHVjdHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZVByb2R1Y3RCeUlkKCBpZDpudW1iZXIgKXtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQga2V5IGluIHRoaXMucHJvZHVjdHMgKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0OiBQcm9kdWN0ID0gdGhpcy5wcm9kdWN0c1trZXldO1xyXG4gICAgICAgICAgICBpZiggcHJvZHVjdC5nZXRJZCgpID09IGlkICl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmtleTpudW1iZXIgPSBwYXJzZUludCgga2V5ICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RzLnNsaWNlKCBua2V5LCAxICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9kdWN0cygpOiBQcm9kdWN0W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXkoJHBhcmVudDogSlF1ZXJ5KTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpdjogc3RyaW5nID0gXCI8ZGl2IGNsYXNzPSd2ZW5kb3InIGlkPSd2ZW5kb3JcIiArIHRoaXMuaWQgKyBcIicgZGF0YS12ZW5kb3I9J1wiICsgdGhpcy5pZCArIFwiJyA+XCI7XHJcbiAgICAgICAgZGl2ICs9IFwiPGEgaHJlZj0nZGV0YWlsJz5cIjsgICAgXHJcbiAgICAgICAgZGl2ICs9IHRoaXMubmFtZSArIFwiPC9hPjwvZGl2PlwiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB0aGlzLiRkb20gPSAkKCBkaXYgKTtcclxuICAgICAgICAkcGFyZW50LmFwcGVuZCggdGhpcy4kZG9tICk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFwiO1xyXG5pbXBvcnQgeyBCREQgfSBmcm9tIFwiLi9CRERcIjtcclxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiLi9DYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBWZW5kb3IgfSBmcm9tIFwiLi9WZW5kb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG5cclxuICAgIHB1YmxpYyAkaXRlbTogSlF1ZXJ5O1xyXG4gICAgcHVibGljICRjb250YWluZXI6IEpRdWVyeTtcclxuICAgIHB1YmxpYyAkY2F0ZWdvcnlfY29udGFpbmVyOiBKUXVlcnk7XHJcbiAgICBwdWJsaWMgJGFsbF92ZW5kb3JzOiBKUXVlcnk7XHJcbiAgICBwdWJsaWMgJHNlbnRlZF9jb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgICBwcml2YXRlIGNhdGVnb3JpZXM6IENhdGVnb3J5W107XHJcbiAgICBwcml2YXRlIGFsbF9wcm9kdWN0czogUHJvZHVjdFtdO1xyXG4gICAgcHJpdmF0ZSB2ZW5kb3JzOiBWZW5kb3JbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgICAgICB0aGlzLiRpdGVtID0gJChcIi5pdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuJGl0ZW0ucHJvcChcImRyYWdnYWJsZVwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkKFwiLmNvbnRhaW5lclwiKTtcclxuICAgICAgICB0aGlzLiRjYXRlZ29yeV9jb250YWluZXIgPSAkKFwiI3Nob3AtbGlzdFwiKTtcclxuICAgICAgICB0aGlzLiRhbGxfdmVuZG9ycyA9ICQoXCIjYWxsLXZlbmRvcnNcIik7XHJcbiAgICAgICAgdGhpcy4kc2VudGVkX2NvbnRhaW5lciA9ICQoXCIjc2VuZGVkLXByb2R1Y3RzXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmFsbF9wcm9kdWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMudmVuZG9ycyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLmdldEFsbENhdGVnb3JpZXMoKTtcclxuICAgICAgICB0aGlzLmdldEFsbFByb2R1Y3RzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRBbGxWZW5kb3JzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzcGxheUNhdGVnb3JpZXMoKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlWZW5kb3JzKCk7XHJcblxyXG4gICAgICAgIGlmKCB0aGlzLnZlbmRvcnMubGVuZ3RoID4gMCApXHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheVByb2R1Y3RzQnlWZW5kb3IoIHRoaXMudmVuZG9yc1swXSApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxQcm9kdWN0cygpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJvZHVjdHM6IHtcclxuICAgICAgICAgICAgaWQ6IG51bWJlcixcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiBudW1iZXJcclxuICAgICAgICB9W10gPSBCREQucHJvZHVjdHM7XHJcblxyXG4gICAgICAgIGZvciAoIGxldCBwcm9kdWN0IG9mIHByb2R1Y3RzICl7XHJcbiAgICAgICAgICAgIGxldCB0aGVfcHJvZHVjdDogUHJvZHVjdCA9IG5ldyBQcm9kdWN0KFxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdC5pZCxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QubmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcnlCeUlkKCBwcm9kdWN0LmNhdGVnb3J5SWQgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmFsbF9wcm9kdWN0cy5wdXNoKCB0aGVfcHJvZHVjdCApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsQ2F0ZWdvcmllcygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGNhdGVnb3JpZXM6IHsgXHJcbiAgICAgICAgICAgIGlkOm51bWJlciwgXHJcbiAgICAgICAgICAgIG5hbWU6c3RyaW5nXHJcbiAgICAgICAgfVtdID0gQkRELmNhdGVnb3JpZXM7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGNhdGVnb3J5IG9mIGNhdGVnb3JpZXMgKXtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGVfY2F0ZWdvcnk6IENhdGVnb3J5ID0gbmV3IENhdGVnb3J5KFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnkuaWQsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeS5uYW1lXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcy5wdXNoKCB0aGVfY2F0ZWdvcnkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldENhdGVnb3J5QnlJZCggaWQ6bnVtYmVyICk6IENhdGVnb3J5IHtcclxuICAgICAgICBcclxuICAgICAgICBmb3IoIGxldCBjYXRlZ29yeSBvZiB0aGlzLmNhdGVnb3JpZXMgKXtcclxuXHJcbiAgICAgICAgICAgIGlmKCBpZCA9PSBjYXRlZ29yeS5nZXRJZCgpICl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsVmVuZG9ycygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy9PbiByZWN1cGVyZSBsZXMgdmVuZG9ycyBkZSBsYSBiZGQgISAoIGZhdXNzZSBiYXNlIGRlIGRvbm7DqWUgQkREKVxyXG4gICAgICAgIGxldCB2ZW5kb3JzOiB7XHJcbiAgICAgICAgICAgIGlkOiBudW1iZXIsXHJcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHJvZHVjdHM6IG51bWJlcltdXHJcbiAgICAgICAgfVtdID0gQkRELnZlbmRvcnM7XHJcblxyXG4gICAgICAgIC8vT24gYm91Y2xlIHN1ciBjZXR0ZSBsaXN0ZSBkZSB2ZW5kZXVyc1xyXG4gICAgICAgIGZvciggbGV0IHZlbmRvciBvZiB2ZW5kb3JzICl7XHJcblxyXG4gICAgICAgICAgICAvL09uIHZhIGF2b2lyIGJlc29pbiBkJ3VuIHRhYmxlYXUgZGUgcHJvZHVpdFxyXG4gICAgICAgICAgICBsZXQgdmVuZG9yc19wcm9kdWN0czpQcm9kdWN0W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vSmUgYm91Y2xlIHN1ciBsZSB0YWJsZWF1IGQnaWQgZGUgdmVuZG9yLnByb2R1Y3RzXHJcbiAgICAgICAgICAgIGZvciggbGV0IHByb2R1Y3RfaWQgb2YgdmVuZG9yLnByb2R1Y3RzICl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9KZSBjaGVyY2hlIGxlIHByb2R1aXQgY29ycmVzcG9uZGFudCwgZ3JhY2UgYSBzb24gaWQsIGRhbnMgbWEgbGlzdGUgZGUgcHJvZHVpdFxyXG4gICAgICAgICAgICAgICAgbGV0IHRoZV9wcm9kdWN0OlByb2R1Y3QgPSB0aGlzLmdldFByb2R1Y3RCeUlkKCBwcm9kdWN0X2lkICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9KZSBwb3Vzc2UgbW9uIHRhYmxlYXUgZCdvYmpldFxyXG4gICAgICAgICAgICAgICAgdmVuZG9yc19wcm9kdWN0cy5wdXNoKCB0aGVfcHJvZHVjdCApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0ljaSwgb24gY3LDqWVyIGxlIHZlbmRldXIgYXZlYyBzYSBjbGFzc2UgZXQgbGUgdGFibGVhdSBkZSBwcm9kdWl0IGNyw6nDqSAhXHJcbiAgICAgICAgICAgIGxldCB0aGVfdmVuZG9yOlZlbmRvciA9IG5ldyBWZW5kb3IoXHJcbiAgICAgICAgICAgICAgICB2ZW5kb3IuaWQsXHJcbiAgICAgICAgICAgICAgICB2ZW5kb3IubmFtZSxcclxuICAgICAgICAgICAgICAgIHZlbmRvcnNfcHJvZHVjdHNcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgLy9qJ2Fqb3V0ZSBtb24gdmVuZGV1ciBhIG1hIGxpc3RlIGRlIHZlbmRldXIgZGUgbW9uIGFwcFxyXG4gICAgICAgICAgICB0aGlzLnZlbmRvcnMucHVzaCggdGhlX3ZlbmRvciApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2R1Y3RCeUlkKCBpZDogbnVtYmVyICk6IFByb2R1Y3Qge1xyXG5cclxuICAgICAgICBmb3IoIGxldCBwcm9kdWN0IG9mIHRoaXMuYWxsX3Byb2R1Y3RzICl7XHJcblxyXG4gICAgICAgICAgICBpZiggaWQgPT0gcHJvZHVjdC5nZXRJZCgpICl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5Q2F0ZWdvcmllcygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgY2F0ZWdvcnkgb2YgdGhpcy5jYXRlZ29yaWVzICl7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5LmRpc3BsYXkoIHRoaXMuJGNhdGVnb3J5X2NvbnRhaW5lciApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheVZlbmRvcnMoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGZvciggbGV0IHZlbmRvciBvZiB0aGlzLnZlbmRvcnMgKXtcclxuICAgICAgICAgICAgdmVuZG9yLmRpc3BsYXkoIHRoaXMuJGFsbF92ZW5kb3JzICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGVhckJvYXJkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJHNlbnRlZF9jb250YWluZXIuaHRtbChcIlwiKTtcclxuICAgICAgICBmb3IoIGxldCBjYXRlZ29yeSBvZiB0aGlzLmNhdGVnb3JpZXMgKXtcclxuICAgICAgICAgICAgY2F0ZWdvcnkuZ2V0JERvbSgpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlQcm9kdWN0c0J5VmVuZG9yKCB2ZW5kb3I6VmVuZG9yICk6dm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJCb2FyZCgpO1xyXG5cclxuICAgICAgICAvL09uIGNoZXJjaGUgcXVlbHMgc29udCBsZXMgcHJvZHVpdHMgdmVuZHUgZXQgbm9uLXZlbmR1XHJcbiAgICAgICAgZm9yKCBsZXQgcHJvZHVjdCBvZiB0aGlzLmFsbF9wcm9kdWN0cyApe1xyXG5cclxuICAgICAgICAgICAgbGV0IGZsYWc6Ym9vbGVhbiA9IGZhbHNlOy8vdHJ1ZSA9IHZlbmR1LCBmYWxzZSA9IG5vbi12ZW5kdVxyXG5cclxuICAgICAgICAgICAgZm9yKCBsZXQgdnByb2R1Y3Qgb2YgdmVuZG9yLmdldFByb2R1Y3RzKCkgKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiggdnByb2R1Y3QuZ2V0SWQoKSA9PSBwcm9kdWN0LmdldElkKCkgKXtcclxuICAgICAgICAgICAgICAgICAgICAvL09uIGEgdHJvdXbDqSBsJ8OpbMOpbWVudCAhXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiggZmxhZyA9PSB0cnVlICl7XHJcbiAgICAgICAgICAgICAgICAvL2FmZmljaGFnZSBjb2xvbm5lIGRyb2l0ZVxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdC5kaXNwbGF5KCB0aGlzLiRzZW50ZWRfY29udGFpbmVyICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2FmZmljaGFnZSBjb2xvbm5lIGdhdWNoZVxyXG4gICAgICAgICAgICAgICAgbGV0IGNhdGVnb3J5OiBDYXRlZ29yeSA9IHByb2R1Y3QuZ2V0Q2F0ZWdvcnkoKTtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QuZGlzcGxheSggY2F0ZWdvcnkuZ2V0JERvbSgpICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmVuZG9yQnlJZCggaWRfdmVuZG9yOm51bWJlciApOlZlbmRvciB7XHJcblxyXG4gICAgICAgIGZvciggbGV0IHZlbmRvciBvZiB0aGlzLnZlbmRvcnMgKXtcclxuXHJcbiAgICAgICAgICAgIGlmKCB2ZW5kb3IuZ2V0SWQoKSA9PSBpZF92ZW5kb3IgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2ZW5kb3I7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vQXBwXCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi9Qcm9kdWN0XCI7XHJcbmltcG9ydCB7IFZlbmRvciB9IGZyb20gXCIuL1ZlbmRvclwiO1xyXG5cclxudmFyIGFwcDpBcHAgPSBuZXcgQXBwKCk7XHJcblxyXG5hcHAuJGNvbnRhaW5lci5vbihcImRyYWdvdmVyXCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbn0pO1xyXG5cclxuYXBwLiRpdGVtLm9uKFwiZHJhZ3N0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuXHJcbiAgICBjb25zdCBkcmFnRXZlbnQ6IERyYWdFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgYXMgRHJhZ0V2ZW50O1xyXG4gICAgZHJhZ0V2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCBcImlkXCIsICQodGhpcykuYXR0cihcImlkXCIpICk7XHJcblxyXG59KTtcclxuXHJcbmFwcC4kY29udGFpbmVyLm9uKFwiZHJvcFwiLCBmdW5jdGlvbihldmVudCl7XHJcblxyXG4gICAgY29uc3QgZHJhZ0V2ZW50OiBEcmFnRXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IGFzIERyYWdFdmVudDtcclxuICAgIGNvbnN0IGlkOiBzdHJpbmcgPSBkcmFnRXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJpZFwiKTtcclxuICAgIGNvbnN0ICRlbGVtZW50OiBKUXVlcnkgPSAkKFwiI1wiK2lkKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lcklkOiBzdHJpbmcgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuXHJcbiAgICBpZiggJCh0aGlzKS5oYXNDbGFzcyhcInZlbmRvclwiKSApe1xyXG4gICAgICAgICQodGhpcykuYXBwZW5kKCAkZWxlbWVudCApO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiggJGVsZW1lbnQuaGFzQ2xhc3MoIGNvbnRhaW5lcklkICkgKXtcclxuICAgICAgICAkKHRoaXMpLmFwcGVuZCggJGVsZW1lbnQgKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi52ZW5kb3JcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBsZXQgaWRfdmVuZGV1cjpudW1iZXIgPSAkKHRoaXMpLmRhdGEoXCJ2ZW5kb3JcIik7XHJcbiAgICBsZXQgdmVuZG9yOiBWZW5kb3IgPSBhcHAuZ2V0VmVuZG9yQnlJZCggaWRfdmVuZGV1ciApO1xyXG4gICAgYXBwLmRpc3BsYXlQcm9kdWN0c0J5VmVuZG9yKCB2ZW5kb3IgKTtcclxuXHJcbn0pO1xyXG5cclxuJChcImFcIikuY2xpY2soZnVuY3Rpb24oZXZlbnQpe1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdmFyIHRhcmdldElkOnN0cmluZyA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICB2YXIgJHRhcmdldDpKUXVlcnkgPSAkKFwiI1wiICsgdGFyZ2V0SWQpO1xyXG5cclxuICAgICQoXCIucGFnZVwiKS5oaWRlKCk7XHJcbiAgICAkdGFyZ2V0LnNob3coKTtcclxuXHJcbn0pOyJdfQ==
