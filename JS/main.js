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
                    let div = "<div class='container container-cat' id='" + this.name + "' data-category=" + this.id + " ></div>";
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
                    let div = "<div id='" + id + "' class='item " + category_name + "' draggable data-product=" + this.id + " ></div>";
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
                addProduct(product) {
                    this.products.push(product);
                }
                removeProduct(product) {
                    for (let key in this.products) {
                        let vproduct = this.products[key];
                        if (vproduct.getId() == product.getId()) {
                            this.products.splice(parseInt(key), 1);
                        }
                        return;
                    }
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
                    if (this.vendors.length > 0) {
                        this.currentVendor = this.vendors[0];
                        this.displayProductsByVendor(this.currentVendor);
                    }
                }
                getCurrentVendor() {
                    return this.currentVendor;
                }
                setCurrentVendor(vendor) {
                    this.currentVendor = vendor;
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
            $(document).on("dragover", ".container", function (event) {
                event.preventDefault();
            });
            $(document).on("dragstart", ".item", function (event) {
                const dragEvent = event.originalEvent;
                dragEvent.dataTransfer.setData("id", $(this).data("product"));
            });
            //Event container fixe de droite
            app.$sented_container.on("drop", function (event) {
                const dragEvent = event.originalEvent;
                let id_product = parseInt(dragEvent.dataTransfer.getData("id"));
                let product = app.getProductById(id_product);
                app.getCurrentVendor().addProduct(product);
                $(this).append(product.get$Dom());
            });
            //Event container des categorie
            $(document).on("drop", ".container-cat", function (event) {
                const dragEvent = event.originalEvent;
                let id_product = parseInt(dragEvent.dataTransfer.getData("id"));
                let product = app.getProductById(id_product);
                app.getCurrentVendor().removeProduct(product);
                product.getCategory().get$Dom()
                    .append(product.get$Dom());
            });
            $(document).on("click", ".vendor", function () {
                let id_vendeur = $(this).data("vendor");
                let vendor = app.getVendorById(id_vendeur);
                app.setCurrentVendor(vendor);
                app.displayProductsByVendor(app.getCurrentVendor());
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL01vZGVsLnRzIiwiVFMvQ2F0ZWdvcnkudHMiLCJUUy9Qcm9kdWN0LnRzIiwiVFMvQkRELnRzIiwiVFMvVmVuZG9yLnRzIiwiVFMvQXBwLnRzIiwiVFMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEsUUFBQTtnQkFLSSxZQUFhLEVBQVM7b0JBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixDQUFDO2dCQUVELEtBQUs7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsT0FBTztvQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDckIsQ0FBQzthQUtKLENBQUE7O1FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7WUNsQkYsV0FBQSxjQUFzQixTQUFRLGFBQUs7Z0JBSS9CLFlBQVksRUFBUyxFQUFFLElBQVc7b0JBQzlCLEtBQUssQ0FBRSxFQUFFLENBQUUsQ0FBQztvQkFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQztnQkFFRCxPQUFPO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixDQUFDO2dCQUVELE9BQU8sQ0FBQyxPQUFlO29CQUVuQixJQUFJLEdBQUcsR0FBVywyQ0FBMkMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO29CQUN0SCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBRSxHQUFHLENBQUUsQ0FBQztvQkFDckIsT0FBTyxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7Z0JBRWhDLENBQUM7YUFFSixDQUFBOztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O1lDcEJGLFVBQUEsYUFBcUIsU0FBUSxhQUFLO2dCQU05QixZQUFhLEVBQVUsRUFBRSxJQUFXLEVBQUUs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QkFDMUIsTUFBTSxDQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBRSxDQUFDO1lBRXJDLENBQUMsQ0FBQyxDQUFDO1lBRUgsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO2dCQUUvQixJQUFJLFVBQVUsR0FBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLE1BQU0sR0FBVyxHQUFHLENBQUMsYUFBYSxDQUFFLFVBQVUsQ0FBRSxDQUFDO2dCQUNyRCxHQUFHLENBQUMsZ0JBQWdCLENBQUUsTUFBTSxDQUFFLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBRSxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBRSxDQUFDO1lBRTFELENBQUMsQ0FBQyxDQUFDO1lBRUgsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEtBQUs7Z0JBRXZCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFdkIsSUFBSSxRQUFRLEdBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxPQUFPLEdBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQztnQkFFdkMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNsQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFbkIsQ0FBQyxDQUFDLENBQUM7UUFBQSxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYWJzdHJhY3QgY2xhc3MgTW9kZWwge1xyXG5cclxuICAgIHByb3RlY3RlZCBpZDogbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkICRkb206IEpRdWVyeTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggaWQ6bnVtYmVyICl7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0JERvbSgpOiBKUXVlcnl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGRvbTtcclxuICAgIH1cclxuXHJcbiAgICAvLyFJbXBvcnRhbnRcclxuICAgIGFic3RyYWN0IGRpc3BsYXkoICRwYXJlbnQ6IEpRdWVyeSApOiB2b2lkO1xyXG5cclxufSIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIE1vZGVsIHtcclxuXHJcbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIG5hbWU6c3RyaW5nKXtcclxuICAgICAgICBzdXBlciggaWQgKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXkoJHBhcmVudDogSlF1ZXJ5KTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpdjogc3RyaW5nID0gXCI8ZGl2IGNsYXNzPSdjb250YWluZXIgY29udGFpbmVyLWNhdCcgaWQ9J1wiICsgdGhpcy5uYW1lICsgXCInIGRhdGEtY2F0ZWdvcnk9XCIgKyB0aGlzLmlkICsgXCIgPjwvZGl2PlwiO1xyXG4gICAgICAgIHRoaXMuJGRvbSA9ICQoIGRpdiApO1xyXG4gICAgICAgICRwYXJlbnQuYXBwZW5kKCB0aGlzLiRkb20gKTtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiLi9DYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIE1vZGVsIHtcclxuXHJcbiAgICBwcml2YXRlIG5hbWU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjYXRlZ29yeTogQ2F0ZWdvcnk7XHJcbiAgICBwcm90ZWN0ZWQgJGRvbTogSlF1ZXJ5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBpZDogbnVtYmVyLCBuYW1lOnN0cmluZywgY2F0ZWdvcnk6IENhdGVnb3J5ICl7XHJcbiAgICAgICAgc3VwZXIoaWQpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xyXG4gICAgfVxyXG5cclxuICAgIGdldENhdGVnb3J5KCk6IENhdGVnb3J5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYXRlZ29yeTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5KCBwYXJlbnQ6IEpRdWVyeSApOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGNhdGVnb3J5X25hbWU6c3RyaW5nID0gdGhpcy5jYXRlZ29yeS5nZXROYW1lKCk7XHJcbiAgICAgICAgbGV0IGlkOnN0cmluZyA9ICBjYXRlZ29yeV9uYW1lICsgdGhpcy5pZDtcclxuICAgICAgICBsZXQgZGF0YV9pZDogbnVtYmVyID0gdGhpcy5pZDtcclxuICAgICAgICBsZXQgZGl2OiBzdHJpbmcgPSBcIjxkaXYgaWQ9J1wiK2lkK1wiJyBjbGFzcz0naXRlbSBcIitjYXRlZ29yeV9uYW1lK1wiJyBkcmFnZ2FibGUgZGF0YS1wcm9kdWN0PVwiK3RoaXMuaWQrXCIgPjwvZGl2PlwiO1xyXG5cclxuICAgICAgICB0aGlzLiRkb20gPSAkKCBkaXYgKTtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kKCB0aGlzLiRkb20gKTtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNvbnN0IEJERDp7IFxyXG4gICAgY2F0ZWdvcmllcyA6IHsgaWQ6bnVtYmVyLCBuYW1lOnN0cmluZ31bXSxcclxuICAgIHByb2R1Y3RzIDogeyBpZDpudW1iZXIsIG5hbWU6IHN0cmluZywgY2F0ZWdvcnlJZDogbnVtYmVyIH1bXSxcclxuICAgIHZlbmRvcnMgOiB7IGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcHJvZHVjdHM6IG51bWJlcltdIH1bXVxyXG4gfSBcclxuICAgID0ge1xyXG5cclxuICAgIGNhdGVnb3JpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiBcInJvdWdlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwicm9zZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICBuYW1lOiBcImJsYW5jXCJcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxuICAgIHByb2R1Y3RzIDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQgOiAxLFxyXG4gICAgICAgICAgICBuYW1lIDogXCJib3JkZWF1eFwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZCA6IDIsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcInJpdmVzYWx0ZVwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogMlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZCA6IDMsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcImNoYW1wYWduZVwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogM1xyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICB2ZW5kb3JzIDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiUGF1bFwiLFxyXG4gICAgICAgICAgICBwcm9kdWN0cyA6IFsgMSwgMiBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkplcmVteVwiLFxyXG4gICAgICAgICAgICBwcm9kdWN0cyA6IFsgMiBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlN0ZXBoYW5lXCIsXHJcbiAgICAgICAgICAgIHByb2R1Y3RzIDogWyAzIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgXVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFwiO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVuZG9yIGV4dGVuZHMgTW9kZWwge1xyXG4gICBcclxuICAgIHByb3RlY3RlZCAkZG9tOiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcHJvZHVjdHM6IFByb2R1Y3RbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggaWQ6bnVtYmVyLCBuYW1lOnN0cmluZywgcHJvZHVjdHM6UHJvZHVjdFtdICl7XHJcbiAgICAgICAgc3VwZXIoIGlkICk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RzID0gcHJvZHVjdHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZVByb2R1Y3RCeUlkKCBpZDpudW1iZXIgKXtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQga2V5IGluIHRoaXMucHJvZHVjdHMgKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0OiBQcm9kdWN0ID0gdGhpcy5wcm9kdWN0c1trZXldO1xyXG4gICAgICAgICAgICBpZiggcHJvZHVjdC5nZXRJZCgpID09IGlkICl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmtleTpudW1iZXIgPSBwYXJzZUludCgga2V5ICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RzLnNsaWNlKCBua2V5LCAxICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9kdWN0cygpOiBQcm9kdWN0W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFByb2R1Y3QoIHByb2R1Y3Q6IFByb2R1Y3QgKTogdm9pZHtcclxuICAgICAgICB0aGlzLnByb2R1Y3RzLnB1c2goIHByb2R1Y3QgKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVQcm9kdWN0KCBwcm9kdWN0OiBQcm9kdWN0ICk6IHZvaWR7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGtleSBpbiB0aGlzLnByb2R1Y3RzICl7XHJcblxyXG4gICAgICAgICAgICBsZXQgdnByb2R1Y3Q6IFByb2R1Y3QgPSB0aGlzLnByb2R1Y3RzW2tleV07XHJcblxyXG4gICAgICAgICAgICBpZiggdnByb2R1Y3QuZ2V0SWQoKSA9PSBwcm9kdWN0LmdldElkKCkgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdHMuc3BsaWNlKCBwYXJzZUludChrZXkpLCAxICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheSgkcGFyZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGl2OiBzdHJpbmcgPSBcIjxkaXYgY2xhc3M9J3ZlbmRvcicgaWQ9J3ZlbmRvclwiICsgdGhpcy5pZCArIFwiJyBkYXRhLXZlbmRvcj0nXCIgKyB0aGlzLmlkICsgXCInID5cIjtcclxuICAgICAgICBkaXYgKz0gXCI8YSBocmVmPSdkZXRhaWwnPlwiOyAgICBcclxuICAgICAgICBkaXYgKz0gdGhpcy5uYW1lICsgXCI8L2E+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuJGRvbSA9ICQoIGRpdiApO1xyXG4gICAgICAgICRwYXJlbnQuYXBwZW5kKCB0aGlzLiRkb20gKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi9Qcm9kdWN0XCI7XHJcbmltcG9ydCB7IEJERCB9IGZyb20gXCIuL0JERFwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCIuL0NhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFZlbmRvciB9IGZyb20gXCIuL1ZlbmRvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcblxyXG4gICAgcHVibGljICRpdGVtOiBKUXVlcnk7XHJcbiAgICBwdWJsaWMgJGNvbnRhaW5lcjogSlF1ZXJ5O1xyXG4gICAgcHVibGljICRjYXRlZ29yeV9jb250YWluZXI6IEpRdWVyeTtcclxuICAgIHB1YmxpYyAkYWxsX3ZlbmRvcnM6IEpRdWVyeTtcclxuICAgIHB1YmxpYyAkc2VudGVkX2NvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICAgIHByaXZhdGUgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXTtcclxuICAgIHByaXZhdGUgYWxsX3Byb2R1Y3RzOiBQcm9kdWN0W107XHJcbiAgICBwcml2YXRlIHZlbmRvcnM6IFZlbmRvcltdO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50VmVuZG9yOiBWZW5kb3I7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICAgICAgdGhpcy4kaXRlbSA9ICQoXCIuaXRlbVwiKTtcclxuICAgICAgICB0aGlzLiRpdGVtLnByb3AoXCJkcmFnZ2FibGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChcIi5jb250YWluZXJcIik7XHJcbiAgICAgICAgdGhpcy4kY2F0ZWdvcnlfY29udGFpbmVyID0gJChcIiNzaG9wLWxpc3RcIik7XHJcbiAgICAgICAgdGhpcy4kYWxsX3ZlbmRvcnMgPSAkKFwiI2FsbC12ZW5kb3JzXCIpO1xyXG4gICAgICAgIHRoaXMuJHNlbnRlZF9jb250YWluZXIgPSAkKFwiI3NlbmRlZC1wcm9kdWN0c1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gW107XHJcbiAgICAgICAgdGhpcy5hbGxfcHJvZHVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnZlbmRvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRBbGxDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRBbGxQcm9kdWN0cygpO1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsVmVuZG9ycygpO1xyXG5cclxuICAgICAgICB0aGlzLmRpc3BsYXlDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5VmVuZG9ycygpO1xyXG5cclxuICAgICAgICBpZiggdGhpcy52ZW5kb3JzLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmVuZG9yID0gdGhpcy52ZW5kb3JzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlQcm9kdWN0c0J5VmVuZG9yKCB0aGlzLmN1cnJlbnRWZW5kb3IgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRWZW5kb3IoKTpWZW5kb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRWZW5kb3I7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VycmVudFZlbmRvciggdmVuZG9yOlZlbmRvciApe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZlbmRvciA9IHZlbmRvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxQcm9kdWN0cygpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJvZHVjdHM6IHtcclxuICAgICAgICAgICAgaWQ6IG51bWJlcixcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiBudW1iZXJcclxuICAgICAgICB9W10gPSBCREQucHJvZHVjdHM7XHJcblxyXG4gICAgICAgIGZvciAoIGxldCBwcm9kdWN0IG9mIHByb2R1Y3RzICl7XHJcbiAgICAgICAgICAgIGxldCB0aGVfcHJvZHVjdDogUHJvZHVjdCA9IG5ldyBQcm9kdWN0KFxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdC5pZCxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QubmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcnlCeUlkKCBwcm9kdWN0LmNhdGVnb3J5SWQgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmFsbF9wcm9kdWN0cy5wdXNoKCB0aGVfcHJvZHVjdCApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsQ2F0ZWdvcmllcygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGNhdGVnb3JpZXM6IHsgXHJcbiAgICAgICAgICAgIGlkOm51bWJlciwgXHJcbiAgICAgICAgICAgIG5hbWU6c3RyaW5nXHJcbiAgICAgICAgfVtdID0gQkRELmNhdGVnb3JpZXM7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGNhdGVnb3J5IG9mIGNhdGVnb3JpZXMgKXtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGVfY2F0ZWdvcnk6IENhdGVnb3J5ID0gbmV3IENhdGVnb3J5KFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnkuaWQsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeS5uYW1lXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcy5wdXNoKCB0aGVfY2F0ZWdvcnkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldENhdGVnb3J5QnlJZCggaWQ6bnVtYmVyICk6IENhdGVnb3J5IHtcclxuICAgICAgICBcclxuICAgICAgICBmb3IoIGxldCBjYXRlZ29yeSBvZiB0aGlzLmNhdGVnb3JpZXMgKXtcclxuXHJcbiAgICAgICAgICAgIGlmKCBpZCA9PSBjYXRlZ29yeS5nZXRJZCgpICl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsVmVuZG9ycygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy9PbiByZWN1cGVyZSBsZXMgdmVuZG9ycyBkZSBsYSBiZGQgISAoIGZhdXNzZSBiYXNlIGRlIGRvbm7DqWUgQkREKVxyXG4gICAgICAgIGxldCB2ZW5kb3JzOiB7XHJcbiAgICAgICAgICAgIGlkOiBudW1iZXIsXHJcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHJvZHVjdHM6IG51bWJlcltdXHJcbiAgICAgICAgfVtdID0gQkRELnZlbmRvcnM7XHJcblxyXG4gICAgICAgIC8vT24gYm91Y2xlIHN1ciBjZXR0ZSBsaXN0ZSBkZSB2ZW5kZXVyc1xyXG4gICAgICAgIGZvciggbGV0IHZlbmRvciBvZiB2ZW5kb3JzICl7XHJcblxyXG4gICAgICAgICAgICAvL09uIHZhIGF2b2lyIGJlc29pbiBkJ3VuIHRhYmxlYXUgZGUgcHJvZHVpdFxyXG4gICAgICAgICAgICBsZXQgdmVuZG9yc19wcm9kdWN0czpQcm9kdWN0W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vSmUgYm91Y2xlIHN1ciBsZSB0YWJsZWF1IGQnaWQgZGUgdmVuZG9yLnByb2R1Y3RzXHJcbiAgICAgICAgICAgIGZvciggbGV0IHByb2R1Y3RfaWQgb2YgdmVuZG9yLnByb2R1Y3RzICl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9KZSBjaGVyY2hlIGxlIHByb2R1aXQgY29ycmVzcG9uZGFudCwgZ3JhY2UgYSBzb24gaWQsIGRhbnMgbWEgbGlzdGUgZGUgcHJvZHVpdFxyXG4gICAgICAgICAgICAgICAgbGV0IHRoZV9wcm9kdWN0OlByb2R1Y3QgPSB0aGlzLmdldFByb2R1Y3RCeUlkKCBwcm9kdWN0X2lkICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9KZSBwb3Vzc2UgbW9uIHRhYmxlYXUgZCdvYmpldFxyXG4gICAgICAgICAgICAgICAgdmVuZG9yc19wcm9kdWN0cy5wdXNoKCB0aGVfcHJvZHVjdCApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0ljaSwgb24gY3LDqWVyIGxlIHZlbmRldXIgYXZlYyBzYSBjbGFzc2UgZXQgbGUgdGFibGVhdSBkZSBwcm9kdWl0IGNyw6nDqSAhXHJcbiAgICAgICAgICAgIGxldCB0aGVfdmVuZG9yOlZlbmRvciA9IG5ldyBWZW5kb3IoXHJcbiAgICAgICAgICAgICAgICB2ZW5kb3IuaWQsXHJcbiAgICAgICAgICAgICAgICB2ZW5kb3IubmFtZSxcclxuICAgICAgICAgICAgICAgIHZlbmRvcnNfcHJvZHVjdHNcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgLy9qJ2Fqb3V0ZSBtb24gdmVuZGV1ciBhIG1hIGxpc3RlIGRlIHZlbmRldXIgZGUgbW9uIGFwcFxyXG4gICAgICAgICAgICB0aGlzLnZlbmRvcnMucHVzaCggdGhlX3ZlbmRvciApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2R1Y3RCeUlkKCBpZDogbnVtYmVyICk6IFByb2R1Y3Qge1xyXG5cclxuICAgICAgICBmb3IoIGxldCBwcm9kdWN0IG9mIHRoaXMuYWxsX3Byb2R1Y3RzICl7XHJcblxyXG4gICAgICAgICAgICBpZiggaWQgPT0gcHJvZHVjdC5nZXRJZCgpICl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5Q2F0ZWdvcmllcygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgY2F0ZWdvcnkgb2YgdGhpcy5jYXRlZ29yaWVzICl7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5LmRpc3BsYXkoIHRoaXMuJGNhdGVnb3J5X2NvbnRhaW5lciApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheVZlbmRvcnMoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGZvciggbGV0IHZlbmRvciBvZiB0aGlzLnZlbmRvcnMgKXtcclxuICAgICAgICAgICAgdmVuZG9yLmRpc3BsYXkoIHRoaXMuJGFsbF92ZW5kb3JzICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGVhckJvYXJkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJHNlbnRlZF9jb250YWluZXIuaHRtbChcIlwiKTtcclxuICAgICAgICBmb3IoIGxldCBjYXRlZ29yeSBvZiB0aGlzLmNhdGVnb3JpZXMgKXtcclxuICAgICAgICAgICAgY2F0ZWdvcnkuZ2V0JERvbSgpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlQcm9kdWN0c0J5VmVuZG9yKCB2ZW5kb3I6VmVuZG9yICk6dm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJCb2FyZCgpO1xyXG5cclxuICAgICAgICAvL09uIGNoZXJjaGUgcXVlbHMgc29udCBsZXMgcHJvZHVpdHMgdmVuZHUgZXQgbm9uLXZlbmR1XHJcbiAgICAgICAgZm9yKCBsZXQgcHJvZHVjdCBvZiB0aGlzLmFsbF9wcm9kdWN0cyApe1xyXG5cclxuICAgICAgICAgICAgbGV0IGZsYWc6Ym9vbGVhbiA9IGZhbHNlOy8vdHJ1ZSA9IHZlbmR1LCBmYWxzZSA9IG5vbi12ZW5kdVxyXG5cclxuICAgICAgICAgICAgZm9yKCBsZXQgdnByb2R1Y3Qgb2YgdmVuZG9yLmdldFByb2R1Y3RzKCkgKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiggdnByb2R1Y3QuZ2V0SWQoKSA9PSBwcm9kdWN0LmdldElkKCkgKXtcclxuICAgICAgICAgICAgICAgICAgICAvL09uIGEgdHJvdXbDqSBsJ8OpbMOpbWVudCAhXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiggZmxhZyA9PSB0cnVlICl7XHJcbiAgICAgICAgICAgICAgICAvL2FmZmljaGFnZSBjb2xvbm5lIGRyb2l0ZVxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdC5kaXNwbGF5KCB0aGlzLiRzZW50ZWRfY29udGFpbmVyICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2FmZmljaGFnZSBjb2xvbm5lIGdhdWNoZVxyXG4gICAgICAgICAgICAgICAgbGV0IGNhdGVnb3J5OiBDYXRlZ29yeSA9IHByb2R1Y3QuZ2V0Q2F0ZWdvcnkoKTtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QuZGlzcGxheSggY2F0ZWdvcnkuZ2V0JERvbSgpICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmVuZG9yQnlJZCggaWRfdmVuZG9yOm51bWJlciApOlZlbmRvciB7XHJcblxyXG4gICAgICAgIGZvciggbGV0IHZlbmRvciBvZiB0aGlzLnZlbmRvcnMgKXtcclxuXHJcbiAgICAgICAgICAgIGlmKCB2ZW5kb3IuZ2V0SWQoKSA9PSBpZF92ZW5kb3IgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2ZW5kb3I7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vQXBwXCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi9Qcm9kdWN0XCI7XHJcbmltcG9ydCB7IFZlbmRvciB9IGZyb20gXCIuL1ZlbmRvclwiO1xyXG5cclxudmFyIGFwcDpBcHAgPSBuZXcgQXBwKCk7XHJcblxyXG4kKGRvY3VtZW50KS5vbihcImRyYWdvdmVyXCIsIFwiLmNvbnRhaW5lclwiLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKFwiZHJhZ3N0YXJ0XCIsIFwiLml0ZW1cIiwgZnVuY3Rpb24oZXZlbnQpeyAgIFxyXG4gICAgXHJcbiAgICBjb25zdCBkcmFnRXZlbnQ6IERyYWdFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgYXMgRHJhZ0V2ZW50O1xyXG4gICAgZHJhZ0V2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCBcImlkXCIsICQodGhpcykuZGF0YShcInByb2R1Y3RcIikgKTtcclxuXHJcbn0pO1xyXG5cclxuLy9FdmVudCBjb250YWluZXIgZml4ZSBkZSBkcm9pdGVcclxuYXBwLiRzZW50ZWRfY29udGFpbmVyLm9uKFwiZHJvcFwiLCBmdW5jdGlvbihldmVudCl7XHJcblxyXG4gICAgY29uc3QgZHJhZ0V2ZW50OiBEcmFnRXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IGFzIERyYWdFdmVudDtcclxuICAgIGxldCBpZF9wcm9kdWN0OiBudW1iZXIgPSBwYXJzZUludCggZHJhZ0V2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwiaWRcIikgKTtcclxuICAgIGxldCBwcm9kdWN0OiBQcm9kdWN0ID0gYXBwLmdldFByb2R1Y3RCeUlkKCBpZF9wcm9kdWN0ICk7XHJcbiAgICBhcHAuZ2V0Q3VycmVudFZlbmRvcigpLmFkZFByb2R1Y3QoIHByb2R1Y3QgKTtcclxuICAgICQodGhpcykuYXBwZW5kKCBwcm9kdWN0LmdldCREb20oKSApO1xyXG5cclxufSk7XHJcblxyXG4vL0V2ZW50IGNvbnRhaW5lciBkZXMgY2F0ZWdvcmllXHJcbiQoZG9jdW1lbnQpLm9uKFwiZHJvcFwiLCBcIi5jb250YWluZXItY2F0XCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuXHJcbiAgICBjb25zdCBkcmFnRXZlbnQ6IERyYWdFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgYXMgRHJhZ0V2ZW50O1xyXG4gICAgbGV0IGlkX3Byb2R1Y3Q6IG51bWJlciA9IHBhcnNlSW50KCBkcmFnRXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJpZFwiKSApO1xyXG4gICAgbGV0IHByb2R1Y3Q6IFByb2R1Y3QgPSBhcHAuZ2V0UHJvZHVjdEJ5SWQoIGlkX3Byb2R1Y3QgKTtcclxuICAgIGFwcC5nZXRDdXJyZW50VmVuZG9yKCkucmVtb3ZlUHJvZHVjdCggcHJvZHVjdCApO1xyXG4gICAgcHJvZHVjdC5nZXRDYXRlZ29yeSgpLmdldCREb20oKVxyXG4gICAgICAgIC5hcHBlbmQoIHByb2R1Y3QuZ2V0JERvbSgpICk7XHJcblxyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIudmVuZG9yXCIsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgbGV0IGlkX3ZlbmRldXI6bnVtYmVyID0gJCh0aGlzKS5kYXRhKFwidmVuZG9yXCIpO1xyXG4gICAgbGV0IHZlbmRvcjogVmVuZG9yID0gYXBwLmdldFZlbmRvckJ5SWQoIGlkX3ZlbmRldXIgKTtcclxuICAgIGFwcC5zZXRDdXJyZW50VmVuZG9yKCB2ZW5kb3IgKTtcclxuICAgIGFwcC5kaXNwbGF5UHJvZHVjdHNCeVZlbmRvciggYXBwLmdldEN1cnJlbnRWZW5kb3IoKSApO1xyXG5cclxufSk7XHJcblxyXG4kKFwiYVwiKS5jbGljayhmdW5jdGlvbihldmVudCl7XHJcblxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgdGFyZ2V0SWQ6c3RyaW5nID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgIHZhciAkdGFyZ2V0OkpRdWVyeSA9ICQoXCIjXCIgKyB0YXJnZXRJZCk7XHJcblxyXG4gICAgJChcIi5wYWdlXCIpLmhpZGUoKTtcclxuICAgICR0YXJnZXQuc2hvdygpO1xyXG5cclxufSk7Il19
