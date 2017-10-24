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
                display($parent) {
                    let div = "<div class='vendor' id='vendor" + this.id + "' data-vendor='" + this.id + "' >";
                    div += this.name + "</div>";
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
                    this.categories = [];
                    this.all_products = [];
                    this.vendors = [];
                    this.getAllCategories();
                    this.getAllProducts();
                    this.getAllVendors();
                    this.displayCategories();
                    this.displayVendors();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL01vZGVsLnRzIiwiVFMvQ2F0ZWdvcnkudHMiLCJUUy9Qcm9kdWN0LnRzIiwiVFMvQkRELnRzIiwiVFMvVmVuZG9yLnRzIiwiVFMvQXBwLnRzIiwiVFMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEsUUFBQTtnQkFLSSxZQUFhLEVBQVM7b0JBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixDQUFDO2dCQUVELEtBQUs7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7YUFLSixDQUFBOztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O1lDZEYsV0FBQSxjQUFzQixTQUFRLGFBQUs7Z0JBSS9CLFlBQVksRUFBUyxFQUFFLElBQVc7b0JBQzlCLEtBQUssQ0FBRSxFQUFFLENBQUUsQ0FBQztvQkFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDckIsQ0FBQztnQkFFRCxPQUFPO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixDQUFDO2dCQUVELE9BQU8sQ0FBQyxPQUFlO29CQUVuQixJQUFJLEdBQUcsR0FBVyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO29CQUN4RyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBRSxHQUFHLENBQUUsQ0FBQztvQkFDckIsT0FBTyxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7Z0JBRWhDLENBQUM7YUFFSixDQUFBOztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O1lDcEJGLFVBQUEsYUFBcUIsU0FBUSxhQUFLO2dCQU05QixZQUFhLEVBQVUsRUFBRSxJQUFXLEVBQUUsUUFBa0I7b0JBQ3BELEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDVixJQUFJLENBQUMsSUFBSSxH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SUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUEsQ0FBQztvQkFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBRSxRQUFRLENBQUUsQ0FBQztnQkFDL0IsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBRSxXQUFXLENBQUcsQ0FBQyxDQUFBLENBQUM7b0JBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUUsUUFBUSxDQUFFLENBQUM7Z0JBQy9CLENBQUM7WUFFTCxDQUFDLENBQUMsQ0FBQztZQUVILENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxLQUFLO2dCQUV2QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRXZCLElBQUksUUFBUSxHQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNDLElBQUksT0FBTyxHQUFVLENBQUMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBRXZDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRW5CLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFic3RyYWN0IGNsYXNzIE1vZGVsIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaWQ6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCAkZG9tOiBKUXVlcnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIGlkOm51bWJlciApe1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIUltcG9ydGFudFxyXG4gICAgYWJzdHJhY3QgZGlzcGxheSggJHBhcmVudDogSlF1ZXJ5ICk6IHZvaWQ7XHJcblxyXG59IiwiaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgTW9kZWwge1xyXG5cclxuICAgIHByaXZhdGUgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOm51bWJlciwgbmFtZTpzdHJpbmcpe1xyXG4gICAgICAgIHN1cGVyKCBpZCApO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheSgkcGFyZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGl2OiBzdHJpbmcgPSBcIjxkaXYgY2xhc3M9J2NvbnRhaW5lcicgaWQ9J1wiICsgdGhpcy5uYW1lICsgXCInIGRhdGEtY2F0ZWdvcnk9XCIgKyB0aGlzLmlkICsgXCIgPjwvZGl2PlwiO1xyXG4gICAgICAgIHRoaXMuJGRvbSA9ICQoIGRpdiApO1xyXG4gICAgICAgICRwYXJlbnQuYXBwZW5kKCB0aGlzLiRkb20gKTtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiLi9DYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIE1vZGVsIHtcclxuXHJcbiAgICBwcml2YXRlIG5hbWU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjYXRlZ29yeTogQ2F0ZWdvcnk7XHJcbiAgICBwcm90ZWN0ZWQgJGRvbTogSlF1ZXJ5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBpZDogbnVtYmVyLCBuYW1lOnN0cmluZywgY2F0ZWdvcnk6IENhdGVnb3J5ICl7XHJcbiAgICAgICAgc3VwZXIoaWQpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXkoIHBhcmVudDogSlF1ZXJ5ICk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgY2F0ZWdvcnlfbmFtZTpzdHJpbmcgPSB0aGlzLmNhdGVnb3J5LmdldE5hbWUoKTtcclxuICAgICAgICBsZXQgaWQ6c3RyaW5nID0gIGNhdGVnb3J5X25hbWUgKyB0aGlzLmlkO1xyXG4gICAgICAgIGxldCBkYXRhX2lkOiBudW1iZXIgPSB0aGlzLmlkO1xyXG4gICAgICAgIGxldCBkaXY6IHN0cmluZyA9IFwiPGRpdiBpZD0nXCIraWQrXCInIGNsYXNzPSdpdGVtIFwiK2NhdGVnb3J5X25hbWUrXCInPjwvZGl2PlwiO1xyXG5cclxuICAgICAgICB0aGlzLiRkb20gPSAkKCBkaXYgKTtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kKCB0aGlzLiRkb20gKTtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNvbnN0IEJERDp7IFxyXG4gICAgY2F0ZWdvcmllcyA6IHsgaWQ6bnVtYmVyLCBuYW1lOnN0cmluZ31bXSxcclxuICAgIHByb2R1Y3RzIDogeyBpZDpudW1iZXIsIG5hbWU6IHN0cmluZywgY2F0ZWdvcnlJZDogbnVtYmVyIH1bXSxcclxuICAgIHZlbmRvcnMgOiB7IGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcHJvZHVjdHM6IG51bWJlcltdIH1bXVxyXG4gfSBcclxuICAgID0ge1xyXG5cclxuICAgIGNhdGVnb3JpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiBcInJvdWdlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwicm9zZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICBuYW1lOiBcImJsYW5jXCJcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxuICAgIHByb2R1Y3RzIDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQgOiAxLFxyXG4gICAgICAgICAgICBuYW1lIDogXCJib3JkZWF1eFwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZCA6IDIsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcInJpdmVzYWx0ZVwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZCA6IDMsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcImNoYW1wYWduZVwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogM1xyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICB2ZW5kb3JzIDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiUGF1bFwiLFxyXG4gICAgICAgICAgICBwcm9kdWN0cyA6IFsgMSwgMiBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkplcmVteVwiLFxyXG4gICAgICAgICAgICBwcm9kdWN0cyA6IFsgMiBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlN0ZXBoYW5lXCIsXHJcbiAgICAgICAgICAgIHByb2R1Y3RzIDogWyAzIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgXVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFwiO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVuZG9yIGV4dGVuZHMgTW9kZWwge1xyXG4gICBcclxuICAgIHByb3RlY3RlZCAkZG9tOiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcHJvZHVjdHM6IFByb2R1Y3RbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggaWQ6bnVtYmVyLCBuYW1lOnN0cmluZywgcHJvZHVjdHM6UHJvZHVjdFtdICl7XHJcbiAgICAgICAgc3VwZXIoIGlkICk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RzID0gcHJvZHVjdHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZVByb2R1Y3RCeUlkKCBpZDpudW1iZXIgKXtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQga2V5IGluIHRoaXMucHJvZHVjdHMgKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0OiBQcm9kdWN0ID0gdGhpcy5wcm9kdWN0c1trZXldO1xyXG4gICAgICAgICAgICBpZiggcHJvZHVjdC5nZXRJZCgpID09IGlkICl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmtleTpudW1iZXIgPSBwYXJzZUludCgga2V5ICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RzLnNsaWNlKCBua2V5LCAxICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5KCRwYXJlbnQ6IEpRdWVyeSk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXY6IHN0cmluZyA9IFwiPGRpdiBjbGFzcz0ndmVuZG9yJyBpZD0ndmVuZG9yXCIgKyB0aGlzLmlkICsgXCInIGRhdGEtdmVuZG9yPSdcIiArIHRoaXMuaWQgKyBcIicgPlwiO1xyXG4gICAgICAgICAgICBkaXYgKz0gdGhpcy5uYW1lICsgXCI8L2Rpdj5cIjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy4kZG9tID0gJCggZGl2ICk7XHJcbiAgICAgICAgJHBhcmVudC5hcHBlbmQoIHRoaXMuJGRvbSApO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcclxuaW1wb3J0IHsgQkREIH0gZnJvbSBcIi4vQkREXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgVmVuZG9yIH0gZnJvbSBcIi4vVmVuZG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwIHtcclxuXHJcbiAgICBwdWJsaWMgJGl0ZW06IEpRdWVyeTtcclxuICAgIHB1YmxpYyAkY29udGFpbmVyOiBKUXVlcnk7XHJcbiAgICBwdWJsaWMgJGNhdGVnb3J5X2NvbnRhaW5lcjogSlF1ZXJ5O1xyXG4gICAgcHVibGljICRhbGxfdmVuZG9yczogSlF1ZXJ5O1xyXG5cclxuICAgIHByaXZhdGUgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXTtcclxuICAgIHByaXZhdGUgYWxsX3Byb2R1Y3RzOiBQcm9kdWN0W107XHJcbiAgICBwcml2YXRlIHZlbmRvcnM6IFZlbmRvcltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgICAgIHRoaXMuJGl0ZW0gPSAkKFwiLml0ZW1cIik7XHJcbiAgICAgICAgdGhpcy4kaXRlbS5wcm9wKFwiZHJhZ2dhYmxlXCIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoXCIuY29udGFpbmVyXCIpO1xyXG4gICAgICAgIHRoaXMuJGNhdGVnb3J5X2NvbnRhaW5lciA9ICQoXCIjc2hvcC1saXN0XCIpO1xyXG4gICAgICAgIHRoaXMuJGFsbF92ZW5kb3JzID0gJChcIiNhbGwtdmVuZG9yc1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gW107XHJcbiAgICAgICAgdGhpcy5hbGxfcHJvZHVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnZlbmRvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRBbGxDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRBbGxQcm9kdWN0cygpO1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsVmVuZG9ycygpO1xyXG5cclxuICAgICAgICB0aGlzLmRpc3BsYXlDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5VmVuZG9ycygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxQcm9kdWN0cygpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJvZHVjdHM6IHtcclxuICAgICAgICAgICAgaWQ6IG51bWJlcixcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiBudW1iZXJcclxuICAgICAgICB9W10gPSBCREQucHJvZHVjdHM7XHJcblxyXG4gICAgICAgIGZvciAoIGxldCBwcm9kdWN0IG9mIHByb2R1Y3RzICl7XHJcbiAgICAgICAgICAgIGxldCB0aGVfcHJvZHVjdDogUHJvZHVjdCA9IG5ldyBQcm9kdWN0KFxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdC5pZCxcclxuICAgICAgICAgICAgICAgIHByb2R1Y3QubmFtZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2F0ZWdvcnlCeUlkKCBwcm9kdWN0LmNhdGVnb3J5SWQgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmFsbF9wcm9kdWN0cy5wdXNoKCB0aGVfcHJvZHVjdCApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsQ2F0ZWdvcmllcygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGNhdGVnb3JpZXM6IHsgXHJcbiAgICAgICAgICAgIGlkOm51bWJlciwgXHJcbiAgICAgICAgICAgIG5hbWU6c3RyaW5nXHJcbiAgICAgICAgfVtdID0gQkRELmNhdGVnb3JpZXM7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGNhdGVnb3J5IG9mIGNhdGVnb3JpZXMgKXtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGVfY2F0ZWdvcnk6IENhdGVnb3J5ID0gbmV3IENhdGVnb3J5KFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnkuaWQsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeS5uYW1lXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcy5wdXNoKCB0aGVfY2F0ZWdvcnkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldENhdGVnb3J5QnlJZCggaWQ6bnVtYmVyICk6IENhdGVnb3J5IHtcclxuICAgICAgICBcclxuICAgICAgICBmb3IoIGxldCBjYXRlZ29yeSBvZiB0aGlzLmNhdGVnb3JpZXMgKXtcclxuXHJcbiAgICAgICAgICAgIGlmKCBpZCA9PSBjYXRlZ29yeS5nZXRJZCgpICl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsVmVuZG9ycygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy9PbiByZWN1cGVyZSBsZXMgdmVuZG9ycyBkZSBsYSBiZGQgISAoIGZhdXNzZSBiYXNlIGRlIGRvbm7DqWUgQkREKVxyXG4gICAgICAgIGxldCB2ZW5kb3JzOiB7XHJcbiAgICAgICAgICAgIGlkOiBudW1iZXIsXHJcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHJvZHVjdHM6IG51bWJlcltdXHJcbiAgICAgICAgfVtdID0gQkRELnZlbmRvcnM7XHJcblxyXG4gICAgICAgIC8vT24gYm91Y2xlIHN1ciBjZXR0ZSBsaXN0ZSBkZSB2ZW5kZXVyc1xyXG4gICAgICAgIGZvciggbGV0IHZlbmRvciBvZiB2ZW5kb3JzICl7XHJcblxyXG4gICAgICAgICAgICAvL09uIHZhIGF2b2lyIGJlc29pbiBkJ3VuIHRhYmxlYXUgZGUgcHJvZHVpdFxyXG4gICAgICAgICAgICBsZXQgdmVuZG9yc19wcm9kdWN0czpQcm9kdWN0W10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vSmUgYm91Y2xlIHN1ciBsZSB0YWJsZWF1IGQnaWQgZGUgdmVuZG9yLnByb2R1Y3RzXHJcbiAgICAgICAgICAgIGZvciggbGV0IHByb2R1Y3RfaWQgb2YgdmVuZG9yLnByb2R1Y3RzICl7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9KZSBjaGVyY2hlIGxlIHByb2R1aXQgY29ycmVzcG9uZGFudCwgZ3JhY2UgYSBzb24gaWQsIGRhbnMgbWEgbGlzdGUgZGUgcHJvZHVpdFxyXG4gICAgICAgICAgICAgICAgbGV0IHRoZV9wcm9kdWN0OlByb2R1Y3QgPSB0aGlzLmdldFByb2R1Y3RCeUlkKCBwcm9kdWN0X2lkICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9KZSBwb3Vzc2UgbW9uIHRhYmxlYXUgZCdvYmpldFxyXG4gICAgICAgICAgICAgICAgdmVuZG9yc19wcm9kdWN0cy5wdXNoKCB0aGVfcHJvZHVjdCApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0ljaSwgb24gY3LDqWVyIGxlIHZlbmRldXIgYXZlYyBzYSBjbGFzc2UgZXQgbGUgdGFibGVhdSBkZSBwcm9kdWl0IGNyw6nDqSAhXHJcbiAgICAgICAgICAgIGxldCB0aGVfdmVuZG9yOlZlbmRvciA9IG5ldyBWZW5kb3IoXHJcbiAgICAgICAgICAgICAgICB2ZW5kb3IuaWQsXHJcbiAgICAgICAgICAgICAgICB2ZW5kb3IubmFtZSxcclxuICAgICAgICAgICAgICAgIHZlbmRvcnNfcHJvZHVjdHNcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgLy9qJ2Fqb3V0ZSBtb24gdmVuZGV1ciBhIG1hIGxpc3RlIGRlIHZlbmRldXIgZGUgbW9uIGFwcFxyXG4gICAgICAgICAgICB0aGlzLnZlbmRvcnMucHVzaCggdGhlX3ZlbmRvciApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2R1Y3RCeUlkKCBpZDogbnVtYmVyICk6IFByb2R1Y3R7XHJcblxyXG4gICAgICAgIGZvciggbGV0IHByb2R1Y3Qgb2YgdGhpcy5hbGxfcHJvZHVjdHMgKXtcclxuXHJcbiAgICAgICAgICAgIGlmKCBpZCA9PSBwcm9kdWN0LmdldElkKCkgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9kdWN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlDYXRlZ29yaWVzKCl7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGNhdGVnb3J5IG9mIHRoaXMuY2F0ZWdvcmllcyApe1xyXG4gICAgICAgICAgICBjYXRlZ29yeS5kaXNwbGF5KCB0aGlzLiRjYXRlZ29yeV9jb250YWluZXIgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlWZW5kb3JzKCl7XHJcblxyXG4gICAgICAgIGZvciggbGV0IHZlbmRvciBvZiB0aGlzLnZlbmRvcnMgKXtcclxuICAgICAgICAgICAgdmVuZG9yLmRpc3BsYXkoIHRoaXMuJGFsbF92ZW5kb3JzICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEFwcCB9IGZyb20gXCIuL0FwcFwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFwiO1xyXG5cclxudmFyIGFwcDpBcHAgPSBuZXcgQXBwKCk7XHJcblxyXG5hcHAuJGNvbnRhaW5lci5vbihcImRyYWdvdmVyXCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbn0pO1xyXG5cclxuYXBwLiRpdGVtLm9uKFwiZHJhZ3N0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuXHJcbiAgICBjb25zdCBkcmFnRXZlbnQ6IERyYWdFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgYXMgRHJhZ0V2ZW50O1xyXG4gICAgZHJhZ0V2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCBcImlkXCIsICQodGhpcykuYXR0cihcImlkXCIpICk7XHJcblxyXG59KTtcclxuXHJcbmFwcC4kY29udGFpbmVyLm9uKFwiZHJvcFwiLCBmdW5jdGlvbihldmVudCl7XHJcblxyXG4gICAgY29uc3QgZHJhZ0V2ZW50OiBEcmFnRXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IGFzIERyYWdFdmVudDtcclxuICAgIGNvbnN0IGlkOiBzdHJpbmcgPSBkcmFnRXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJpZFwiKTtcclxuICAgIGNvbnN0ICRlbGVtZW50OiBKUXVlcnkgPSAkKFwiI1wiK2lkKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lcklkOiBzdHJpbmcgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuXHJcbiAgICBpZiggJCh0aGlzKS5oYXNDbGFzcyhcInZlbmRvclwiKSApe1xyXG4gICAgICAgICQodGhpcykuYXBwZW5kKCAkZWxlbWVudCApO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiggJGVsZW1lbnQuaGFzQ2xhc3MoIGNvbnRhaW5lcklkICkgKXtcclxuICAgICAgICAkKHRoaXMpLmFwcGVuZCggJGVsZW1lbnQgKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuJChcImFcIikuY2xpY2soZnVuY3Rpb24oZXZlbnQpe1xyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdmFyIHRhcmdldElkOnN0cmluZyA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICB2YXIgJHRhcmdldDpKUXVlcnkgPSAkKFwiI1wiICsgdGFyZ2V0SWQpO1xyXG5cclxuICAgICQoXCIucGFnZVwiKS5oaWRlKCk7XHJcbiAgICAkdGFyZ2V0LnNob3coKTtcclxuXHJcbn0pOyJdfQ==
