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
                        products: [1]
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
                display($parent) {
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
                    this.categories = [];
                    this.all_products = [];
                    this.vendors = [];
                    this.getAllCategories();
                    this.getAllProducts();
                    this.getAllVendors();
                    console.log(this.vendors);
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
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL01vZGVsLnRzIiwiVFMvQ2F0ZWdvcnkudHMiLCJUUy9Qcm9kdWN0LnRzIiwiVFMvQkRELnRzIiwiVFMvVmVuZG9yLnRzIiwiVFMvQXBwLnRzIiwiVFMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEsUUFBQTtnQkFJSSxZQUFhLEVBQVM7b0JBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixDQUFDO2dCQUVELEtBQUs7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7YUFNSixDQUFBOztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O1lDZEYsV0FBQSxjQUFzQixTQUFRLGFBQUs7Z0JBTS9CLFlBQVksRUFBUyxFQUFFLElBQVc7b0JBQzlCLEtBQUssQ0FBRSxFQUFFLENBQUUsQ0FBQztvQkFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQztnQkFFRCxPQUFPO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixDQUFDO2dCQUVELE9BQU8sQ0FBQyxPQUFlO2dCQUV2QixDQUFDO2FBRUosQ0FBQTs7UUFBQSxDQUFDOzs7Ozs7Ozs7Ozs7OztZQ2xCRixVQUFBLGFBQXFCLFNBQVEsYUFBSztnQkFNOUIsWUFBYSxFQUFVLEVBQUUsSUFBVyxFQUFFLFFBQWtCO29CQUNwRCxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUM3QixDQUFDO2dCQUVELE9BQU8sQ0FBRSxNQUFjO29CQUVuQixJQUFJLGFBQWEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNuRCxJQUFJLEVBQUUsR0FBVyxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDekMs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QUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFFLFFBQVEsQ0FBRSxDQUFDO2dCQUMvQixDQUFDO2dCQUNELElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBRSxRQUFRLENBQUMsUUFBUSxDQUFFLFdBQVcsQ0FBRyxDQUFDLENBQUEsQ0FBQztvQkFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBRSxRQUFRLENBQUUsQ0FBQztnQkFDL0IsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUFDO1FBRUgsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1vZGVsIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaWQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggaWQ6bnVtYmVyICl7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8hSW1wb3J0YW50XHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgJGRvbTogSlF1ZXJ5O1xyXG4gICAgYWJzdHJhY3QgZGlzcGxheSggJHBhcmVudDogSlF1ZXJ5ICk6IHZvaWQ7XHJcblxyXG59IiwiaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgTW9kZWwge1xyXG5cclxuICAgIHByb3RlY3RlZCAkZG9tOiBKUXVlcnk7XHJcblxyXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyLCBuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoIGlkICk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5KCRwYXJlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2R1Y3QgZXh0ZW5kcyBNb2RlbCB7XHJcblxyXG4gICAgcHJpdmF0ZSBuYW1lOnN0cmluZztcclxuICAgIHByaXZhdGUgY2F0ZWdvcnk6IENhdGVnb3J5O1xyXG4gICAgcHJvdGVjdGVkICRkb206IEpRdWVyeTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggaWQ6IG51bWJlciwgbmFtZTpzdHJpbmcsIGNhdGVnb3J5OiBDYXRlZ29yeSApe1xyXG4gICAgICAgIHN1cGVyKGlkKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5KCBwYXJlbnQ6IEpRdWVyeSApOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGNhdGVnb3J5X25hbWU6c3RyaW5nID0gdGhpcy5jYXRlZ29yeS5nZXROYW1lKCk7XHJcbiAgICAgICAgbGV0IGlkOnN0cmluZyA9ICBjYXRlZ29yeV9uYW1lICsgdGhpcy5pZDtcclxuICAgICAgICBsZXQgZGF0YV9pZDogbnVtYmVyID0gdGhpcy5pZDtcclxuICAgICAgICBsZXQgZGl2OiBzdHJpbmcgPSBcIjxkaXYgaWQ9J1wiK2lkK1wiJyBjbGFzcz0naXRlbSBcIitjYXRlZ29yeV9uYW1lK1wiJz48L2Rpdj5cIjtcclxuXHJcbiAgICAgICAgdGhpcy4kZG9tID0gJCggZGl2ICk7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZCggdGhpcy4kZG9tICk7XHJcblxyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBjb25zdCBCREQ6eyBcclxuICAgIGNhdGVnb3JpZXMgOiB7IGlkOm51bWJlciwgbmFtZTpzdHJpbmd9W10sXHJcbiAgICBwcm9kdWN0cyA6IHsgaWQ6bnVtYmVyLCBuYW1lOiBzdHJpbmcsIGNhdGVnb3J5SWQ6IG51bWJlciB9W10sXHJcbiAgICB2ZW5kb3JzIDogeyBpZDogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIHByb2R1Y3RzOiBudW1iZXJbXSB9W11cclxuIH0gXHJcbiAgICA9IHtcclxuXHJcbiAgICBjYXRlZ29yaWVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgbmFtZTogXCJyb3VnZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgICBuYW1lOiBcInJvc2VcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMyxcclxuICAgICAgICAgICAgbmFtZTogXCJibGFuY1wiXHJcbiAgICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBwcm9kdWN0cyA6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkIDogMSxcclxuICAgICAgICAgICAgbmFtZSA6IFwiYm9yZGVhdXhcIixcclxuICAgICAgICAgICAgY2F0ZWdvcnlJZCA6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQgOiAyLFxyXG4gICAgICAgICAgICBuYW1lIDogXCJyaXZlc2FsdGVcIixcclxuICAgICAgICAgICAgY2F0ZWdvcnlJZCA6IDNcclxuICAgICAgICB9XHJcbiAgICBdLFxyXG4gICAgdmVuZG9ycyA6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlBhdWxcIixcclxuICAgICAgICAgICAgcHJvZHVjdHMgOiBbIDEsIDIgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMixcclxuICAgICAgICAgICAgbmFtZTogXCJKZXJlbXlcIixcclxuICAgICAgICAgICAgcHJvZHVjdHMgOiBbIDIgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMyxcclxuICAgICAgICAgICAgbmFtZTogXCJTdGVwaGFuZVwiLFxyXG4gICAgICAgICAgICBwcm9kdWN0cyA6IFsgMSBdXHJcbiAgICAgICAgfVxyXG5cclxuICAgIF1cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcclxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlbmRvciBleHRlbmRzIE1vZGVsIHtcclxuICAgXHJcbiAgICBwcm90ZWN0ZWQgJGRvbTogSlF1ZXJ5O1xyXG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHByb2R1Y3RzOiBQcm9kdWN0W107XHJcblxyXG4gICAgY29uc3RydWN0b3IoIGlkOm51bWJlciwgbmFtZTpzdHJpbmcsIHByb2R1Y3RzOlByb2R1Y3RbXSApe1xyXG4gICAgICAgIHN1cGVyKCBpZCApO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHByb2R1Y3RzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW1vdmVQcm9kdWN0QnlJZCggaWQ6bnVtYmVyICl7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGtleSBpbiB0aGlzLnByb2R1Y3RzICl7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvZHVjdDogUHJvZHVjdCA9IHRoaXMucHJvZHVjdHNba2V5XTtcclxuICAgICAgICAgICAgaWYoIHByb2R1Y3QuZ2V0SWQoKSA9PSBpZCApe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5rZXk6bnVtYmVyID0gcGFyc2VJbnQoIGtleSApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0cy5zbGljZSggbmtleSwgMSApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheSgkcGFyZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcclxuaW1wb3J0IHsgQkREIH0gZnJvbSBcIi4vQkREXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgVmVuZG9yIH0gZnJvbSBcIi4vVmVuZG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwIHtcclxuXHJcbiAgICBwdWJsaWMgJGl0ZW06IEpRdWVyeTtcclxuICAgIHB1YmxpYyAkY29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gICAgcHJpdmF0ZSBjYXRlZ29yaWVzOiBDYXRlZ29yeVtdO1xyXG4gICAgcHJpdmF0ZSBhbGxfcHJvZHVjdHM6IFByb2R1Y3RbXTtcclxuICAgIHByaXZhdGUgdmVuZG9yczogVmVuZG9yW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICAgICAgdGhpcy4kaXRlbSA9ICQoXCIuaXRlbVwiKTtcclxuICAgICAgICB0aGlzLiRpdGVtLnByb3AoXCJkcmFnZ2FibGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChcIi5jb250YWluZXJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYWxsX3Byb2R1Y3RzID0gW107XHJcbiAgICAgICAgdGhpcy52ZW5kb3JzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0QWxsQ2F0ZWdvcmllcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsUHJvZHVjdHMoKTtcclxuICAgICAgICB0aGlzLmdldEFsbFZlbmRvcnMoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coIHRoaXMudmVuZG9ycyApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbFByb2R1Y3RzKCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwcm9kdWN0czoge1xyXG4gICAgICAgICAgICBpZDogbnVtYmVyLFxyXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIGNhdGVnb3J5SWQ6IG51bWJlclxyXG4gICAgICAgIH1bXSA9IEJERC5wcm9kdWN0cztcclxuXHJcbiAgICAgICAgZm9yICggbGV0IHByb2R1Y3Qgb2YgcHJvZHVjdHMgKXtcclxuICAgICAgICAgICAgbGV0IHRoZV9wcm9kdWN0OiBQcm9kdWN0ID0gbmV3IFByb2R1Y3QoXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0LmlkLFxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yeUJ5SWQoIHByb2R1Y3QuY2F0ZWdvcnlJZCApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX3Byb2R1Y3RzLnB1c2goIHRoZV9wcm9kdWN0ICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxDYXRlZ29yaWVzKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgY2F0ZWdvcmllczogeyBcclxuICAgICAgICAgICAgaWQ6bnVtYmVyLCBcclxuICAgICAgICAgICAgbmFtZTpzdHJpbmdcclxuICAgICAgICB9W10gPSBCREQuY2F0ZWdvcmllcztcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgY2F0ZWdvcnkgb2YgY2F0ZWdvcmllcyApe1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoZV9jYXRlZ29yeTogQ2F0ZWdvcnkgPSBuZXcgQ2F0ZWdvcnkoXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeS5pZCxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5Lm5hbWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLnB1c2goIHRoZV9jYXRlZ29yeSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2F0ZWdvcnlCeUlkKCBpZDpudW1iZXIgKTogQ2F0ZWdvcnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciggbGV0IGNhdGVnb3J5IG9mIHRoaXMuY2F0ZWdvcmllcyApe1xyXG5cclxuICAgICAgICAgICAgaWYoIGlkID09IGNhdGVnb3J5LmdldElkKCkgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYXRlZ29yeTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxWZW5kb3JzKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvL09uIHJlY3VwZXJlIGxlcyB2ZW5kb3JzIGRlIGxhIGJkZCAhICggZmF1c3NlIGJhc2UgZGUgZG9ubsOpZSBCREQpXHJcbiAgICAgICAgbGV0IHZlbmRvcnM6IHtcclxuICAgICAgICAgICAgaWQ6IG51bWJlcixcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBwcm9kdWN0czogbnVtYmVyW11cclxuICAgICAgICB9W10gPSBCREQudmVuZG9ycztcclxuXHJcbiAgICAgICAgLy9PbiBib3VjbGUgc3VyIGNldHRlIGxpc3RlIGRlIHZlbmRldXJzXHJcbiAgICAgICAgZm9yKCBsZXQgdmVuZG9yIG9mIHZlbmRvcnMgKXtcclxuXHJcbiAgICAgICAgICAgIC8vT24gdmEgYXZvaXIgYmVzb2luIGQndW4gdGFibGVhdSBkZSBwcm9kdWl0XHJcbiAgICAgICAgICAgIGxldCB2ZW5kb3JzX3Byb2R1Y3RzOlByb2R1Y3RbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy9KZSBib3VjbGUgc3VyIGxlIHRhYmxlYXUgZCdpZCBkZSB2ZW5kb3IucHJvZHVjdHNcclxuICAgICAgICAgICAgZm9yKCBsZXQgcHJvZHVjdF9pZCBvZiB2ZW5kb3IucHJvZHVjdHMgKXtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0plIGNoZXJjaGUgbGUgcHJvZHVpdCBjb3JyZXNwb25kYW50LCBncmFjZSBhIHNvbiBpZCwgZGFucyBtYSBsaXN0ZSBkZSBwcm9kdWl0XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhlX3Byb2R1Y3Q6UHJvZHVjdCA9IHRoaXMuZ2V0UHJvZHVjdEJ5SWQoIHByb2R1Y3RfaWQgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0plIHBvdXNzZSBtb24gdGFibGVhdSBkJ29iamV0XHJcbiAgICAgICAgICAgICAgICB2ZW5kb3JzX3Byb2R1Y3RzLnB1c2goIHRoZV9wcm9kdWN0ICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSWNpLCBvbiBjcsOpZXIgbGUgdmVuZGV1ciBhdmVjIHNhIGNsYXNzZSBldCBsZSB0YWJsZWF1IGRlIHByb2R1aXQgY3LDqcOpICFcclxuICAgICAgICAgICAgbGV0IHRoZV92ZW5kb3I6VmVuZG9yID0gbmV3IFZlbmRvcihcclxuICAgICAgICAgICAgICAgIHZlbmRvci5pZCxcclxuICAgICAgICAgICAgICAgIHZlbmRvci5uYW1lLFxyXG4gICAgICAgICAgICAgICAgdmVuZG9yc19wcm9kdWN0c1xyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAvL2onYWpvdXRlIG1vbiB2ZW5kZXVyIGEgbWEgbGlzdGUgZGUgdmVuZGV1ciBkZSBtb24gYXBwXHJcbiAgICAgICAgICAgIHRoaXMudmVuZG9ycy5wdXNoKCB0aGVfdmVuZG9yICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvZHVjdEJ5SWQoIGlkOiBudW1iZXIgKTogUHJvZHVjdHtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgcHJvZHVjdCBvZiB0aGlzLmFsbF9wcm9kdWN0cyApe1xyXG5cclxuICAgICAgICAgICAgaWYoIGlkID09IHByb2R1Y3QuZ2V0SWQoKSApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3Q7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vQXBwXCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi9Qcm9kdWN0XCI7XHJcblxyXG52YXIgYXBwOkFwcCA9IG5ldyBBcHAoKTtcclxuXHJcbmFwcC4kY29udGFpbmVyLm9uKFwiZHJhZ292ZXJcIiwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxufSk7XHJcblxyXG5hcHAuJGl0ZW0ub24oXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQpe1xyXG5cclxuICAgIGNvbnN0IGRyYWdFdmVudDogRHJhZ0V2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCBhcyBEcmFnRXZlbnQ7XHJcbiAgICBkcmFnRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoIFwiaWRcIiwgJCh0aGlzKS5hdHRyKFwiaWRcIikgKTtcclxuXHJcbn0pO1xyXG5cclxuYXBwLiRjb250YWluZXIub24oXCJkcm9wXCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuXHJcbiAgICBjb25zdCBkcmFnRXZlbnQ6IERyYWdFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgYXMgRHJhZ0V2ZW50O1xyXG4gICAgY29uc3QgaWQ6IHN0cmluZyA9IGRyYWdFdmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcImlkXCIpO1xyXG4gICAgY29uc3QgJGVsZW1lbnQ6IEpRdWVyeSA9ICQoXCIjXCIraWQpO1xyXG4gICAgY29uc3QgY29udGFpbmVySWQ6IHN0cmluZyA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG5cclxuICAgIGlmKCAkKHRoaXMpLmhhc0NsYXNzKFwidmVuZG9yXCIpICl7XHJcbiAgICAgICAgJCh0aGlzKS5hcHBlbmQoICRlbGVtZW50ICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKCAkZWxlbWVudC5oYXNDbGFzcyggY29udGFpbmVySWQgKSApe1xyXG4gICAgICAgICQodGhpcykuYXBwZW5kKCAkZWxlbWVudCApO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4iXX0=
