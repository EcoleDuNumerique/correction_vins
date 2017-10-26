System.register("APIService", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var APIService;
    return {
        setters: [],
        execute: function () {
            APIService = class APIService {
                constructor() {
                    this.url = "http://192.168.110.52/courses_typescript/vendor_products/API/";
                }
                static getService() {
                    if (!APIService.instance)
                        APIService.instance = new APIService();
                    return APIService.instance;
                }
                getWines() {
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            url: this.url + "wines",
                            dataType: "json",
                            success: (wines) => {
                                resolve(wines);
                            },
                            error: (error) => {
                                reject(error);
                            }
                        });
                    });
                }
            };
            APIService.instance = null;
            exports_1("APIService", APIService);
        }
    };
});
System.register("Model", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
            exports_2("Model", Model);
        }
    };
});
System.register("Category", ["Model"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
            exports_3("Category", Category);
        }
    };
});
System.register("Product", ["Model"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
            exports_4("Product", Product);
        }
    };
});
System.register("BDD", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var BDD;
    return {
        setters: [],
        execute: function () {
            exports_5("BDD", BDD = {
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
System.register("Vendor", ["Model"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
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
            exports_6("Vendor", Vendor);
        }
    };
});
System.register("App", ["Product", "BDD", "Category", "Vendor", "APIService"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var Product_1, BDD_1, Category_1, Vendor_1, APIService_1, App;
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
            },
            function (APIService_1_1) {
                APIService_1 = APIService_1_1;
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
                    var api = APIService_1.APIService.getService();
                    let products = api.getWines();
                    products
                        .then((products) => {
                        for (let product of products) {
                            let the_product = new Product_1.Product(product.id, product.name, this.getCategoryById(product.categoryId));
                            this.all_products.push(the_product);
                        }
                    })
                        .catch((error) => {
                        console.log(error);
                    });
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
            exports_7("App", App);
        }
    };
});
System.register("main", ["App"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL0FQSVNlcnZpY2UudHMiLCJUUy9Nb2RlbC50cyIsIlRTL0NhdGVnb3J5LnRzIiwiVFMvUHJvZHVjdC50cyIsIlRTL0JERC50cyIsIlRTL1ZlbmRvci50cyIsIlRTL0FwcC50cyIsIlRTL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBLGFBQUE7Z0JBYUk7b0JBVlEsUUFBRyxHQUFVLCtEQUErRCxDQUFDO2dCQVUvRCxDQUFDO2dCQVJ2QixNQUFNLENBQUMsVUFBVTtvQkFFYixFQUFFLENBQUEsQ0FBRSxDQUFDLFVBQVUsQ0FBQyxRQUFTLENBQUM7d0JBQ3RCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztvQkFFM0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7Z0JBQy9CLENBQUM7Z0JBSUQsUUFBUTtvQkFFSixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7d0JBQ25DLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ0gsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTzs0QkFDdkIsUUFBUSxFQUFDLE1BQU07NEJBQ2YsT0FBTyxFQUFFLENBQUUsS0FBUyxFQUFHLEVBQUU7Z0NBQ3JCLE9BQU8sQ0FBRSxLQUFLLENBQUUsQ0FBQzs0QkFDckIsQ0FBQzs0QkFDRCxLQUFLLEVBQUUsQ0FBRSxLQUFLLEVBQUcsRUFBRTtnQ0FDZixNQUFNLENBQUUsS0FBSyxDQUFFLENBQUM7NEJBQ3BCLENBQUM7eUJBQ0osQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQyxDQUFBO2dCQUVOLENBQUM7YUFFSixDQUFBO1lBOUJrQixtQkFBUSxHQUFlLElBQUksQ0FBQzs7UUE4QjlDLENBQUM7Ozs7Ozs7Ozs7WUNoQ0YsUUFBQTtnQkFLSSxZQUFhLEVBQVM7b0JBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixDQUFDO2dC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Q0FBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUUsQ0FBQztZQUVyQyxDQUFDLENBQUMsQ0FBQztZQUVILENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtnQkFFL0IsSUFBSSxVQUFVLEdBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxNQUFNLEdBQVcsR0FBRyxDQUFDLGFBQWEsQ0FBRSxVQUFVLENBQUUsQ0FBQztnQkFDckQsR0FBRyxDQUFDLGdCQUFnQixDQUFFLE1BQU0sQ0FBRSxDQUFDO2dCQUMvQixHQUFHLENBQUMsdUJBQXVCLENBQUUsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUUsQ0FBQztZQUUxRCxDQUFDLENBQUMsQ0FBQztZQUVILENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxLQUFLO2dCQUV2QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRXZCLElBQUksUUFBUSxHQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNDLElBQUksT0FBTyxHQUFVLENBQUMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUM7Z0JBRXZDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRW5CLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBBUElTZXJ2aWNlID0gbnVsbDtcclxuICAgIHByaXZhdGUgdXJsOnN0cmluZyA9IFwiaHR0cDovLzE5Mi4xNjguMTEwLjUyL2NvdXJzZXNfdHlwZXNjcmlwdC92ZW5kb3JfcHJvZHVjdHMvQVBJL1wiO1xyXG5cclxuICAgIHN0YXRpYyBnZXRTZXJ2aWNlKCk6IEFQSVNlcnZpY2Uge1xyXG5cclxuICAgICAgICBpZiggIUFQSVNlcnZpY2UuaW5zdGFuY2UgKVxyXG4gICAgICAgICAgICBBUElTZXJ2aWNlLmluc3RhbmNlID0gbmV3IEFQSVNlcnZpY2UoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEFQSVNlcnZpY2UuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe31cclxuXHJcbiAgICBnZXRXaW5lcygpOiBQcm9taXNlPHt9PiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwgKyBcIndpbmVzXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTpcImpzb25cIixcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICggd2luZXM6IHt9ICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoIHdpbmVzICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6ICggZXJyb3IgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCBlcnJvciApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgYWJzdHJhY3QgY2xhc3MgTW9kZWwge1xyXG5cclxuICAgIHByb3RlY3RlZCBpZDogbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkICRkb206IEpRdWVyeTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggaWQ6bnVtYmVyICl7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0JERvbSgpOiBKUXVlcnl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGRvbTtcclxuICAgIH1cclxuXHJcbiAgICAvLyFJbXBvcnRhbnRcclxuICAgIGFic3RyYWN0IGRpc3BsYXkoICRwYXJlbnQ6IEpRdWVyeSApOiB2b2lkO1xyXG5cclxufSIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIE1vZGVsIHtcclxuXHJcbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDpudW1iZXIsIG5hbWU6c3RyaW5nKXtcclxuICAgICAgICBzdXBlciggaWQgKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXkoJHBhcmVudDogSlF1ZXJ5KTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRpdjogc3RyaW5nID0gXCI8ZGl2IGNsYXNzPSdjb250YWluZXIgY29udGFpbmVyLWNhdCcgaWQ9J1wiICsgdGhpcy5uYW1lICsgXCInIGRhdGEtY2F0ZWdvcnk9XCIgKyB0aGlzLmlkICsgXCIgPjwvZGl2PlwiO1xyXG4gICAgICAgIHRoaXMuJGRvbSA9ICQoIGRpdiApO1xyXG4gICAgICAgICRwYXJlbnQuYXBwZW5kKCB0aGlzLiRkb20gKTtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiLi9DYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIE1vZGVsIHtcclxuXHJcbiAgICBwcml2YXRlIG5hbWU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjYXRlZ29yeTogQ2F0ZWdvcnk7XHJcbiAgICBwcm90ZWN0ZWQgJGRvbTogSlF1ZXJ5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBpZDogbnVtYmVyLCBuYW1lOnN0cmluZywgY2F0ZWdvcnk6IENhdGVnb3J5ICl7XHJcbiAgICAgICAgc3VwZXIoaWQpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xyXG4gICAgfVxyXG5cclxuICAgIGdldENhdGVnb3J5KCk6IENhdGVnb3J5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYXRlZ29yeTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5KCBwYXJlbnQ6IEpRdWVyeSApOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGNhdGVnb3J5X25hbWU6c3RyaW5nID0gdGhpcy5jYXRlZ29yeS5nZXROYW1lKCk7XHJcbiAgICAgICAgbGV0IGlkOnN0cmluZyA9ICBjYXRlZ29yeV9uYW1lICsgdGhpcy5pZDtcclxuICAgICAgICBsZXQgZGF0YV9pZDogbnVtYmVyID0gdGhpcy5pZDtcclxuICAgICAgICBsZXQgZGl2OiBzdHJpbmcgPSBcIjxkaXYgaWQ9J1wiK2lkK1wiJyBjbGFzcz0naXRlbSBcIitjYXRlZ29yeV9uYW1lK1wiJyBkcmFnZ2FibGUgZGF0YS1wcm9kdWN0PVwiK3RoaXMuaWQrXCIgPjwvZGl2PlwiO1xyXG5cclxuICAgICAgICB0aGlzLiRkb20gPSAkKCBkaXYgKTtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kKCB0aGlzLiRkb20gKTtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNvbnN0IEJERDp7IFxyXG4gICAgY2F0ZWdvcmllcyA6IHsgaWQ6bnVtYmVyLCBuYW1lOnN0cmluZ31bXSxcclxuICAgIHByb2R1Y3RzIDogeyBpZDpudW1iZXIsIG5hbWU6IHN0cmluZywgY2F0ZWdvcnlJZDogbnVtYmVyIH1bXSxcclxuICAgIHZlbmRvcnMgOiB7IGlkOiBudW1iZXIsIG5hbWU6IHN0cmluZywgcHJvZHVjdHM6IG51bWJlcltdIH1bXVxyXG4gfSBcclxuICAgID0ge1xyXG5cclxuICAgIGNhdGVnb3JpZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiBcInJvdWdlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwicm9zZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICBuYW1lOiBcImJsYW5jXCJcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxuICAgIHByb2R1Y3RzIDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQgOiAxLFxyXG4gICAgICAgICAgICBuYW1lIDogXCJib3JkZWF1eFwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZCA6IDIsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcInJpdmVzYWx0ZVwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogMlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZCA6IDMsXHJcbiAgICAgICAgICAgIG5hbWUgOiBcImNoYW1wYWduZVwiLFxyXG4gICAgICAgICAgICBjYXRlZ29yeUlkIDogM1xyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICB2ZW5kb3JzIDogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiUGF1bFwiLFxyXG4gICAgICAgICAgICBwcm9kdWN0cyA6IFsgMSwgMiBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkplcmVteVwiLFxyXG4gICAgICAgICAgICBwcm9kdWN0cyA6IFsgMiBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlN0ZXBoYW5lXCIsXHJcbiAgICAgICAgICAgIHByb2R1Y3RzIDogWyAzIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgXVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFwiO1xyXG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL01vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVuZG9yIGV4dGVuZHMgTW9kZWwge1xyXG4gICBcclxuICAgIHByb3RlY3RlZCAkZG9tOiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcHJvZHVjdHM6IFByb2R1Y3RbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggaWQ6bnVtYmVyLCBuYW1lOnN0cmluZywgcHJvZHVjdHM6UHJvZHVjdFtdICl7XHJcbiAgICAgICAgc3VwZXIoIGlkICk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RzID0gcHJvZHVjdHM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZVByb2R1Y3RCeUlkKCBpZDpudW1iZXIgKXtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQga2V5IGluIHRoaXMucHJvZHVjdHMgKXtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcm9kdWN0OiBQcm9kdWN0ID0gdGhpcy5wcm9kdWN0c1trZXldO1xyXG4gICAgICAgICAgICBpZiggcHJvZHVjdC5nZXRJZCgpID09IGlkICl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmtleTpudW1iZXIgPSBwYXJzZUludCgga2V5ICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3RzLnNsaWNlKCBua2V5LCAxICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9kdWN0cygpOiBQcm9kdWN0W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFByb2R1Y3QoIHByb2R1Y3Q6IFByb2R1Y3QgKTogdm9pZHtcclxuICAgICAgICB0aGlzLnByb2R1Y3RzLnB1c2goIHByb2R1Y3QgKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVQcm9kdWN0KCBwcm9kdWN0OiBQcm9kdWN0ICk6IHZvaWR7XHJcblxyXG4gICAgICAgIGZvciggbGV0IGtleSBpbiB0aGlzLnByb2R1Y3RzICl7XHJcblxyXG4gICAgICAgICAgICBsZXQgdnByb2R1Y3Q6IFByb2R1Y3QgPSB0aGlzLnByb2R1Y3RzW2tleV07XHJcblxyXG4gICAgICAgICAgICBpZiggdnByb2R1Y3QuZ2V0SWQoKSA9PSBwcm9kdWN0LmdldElkKCkgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdHMuc3BsaWNlKCBwYXJzZUludChrZXkpLCAxICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheSgkcGFyZW50OiBKUXVlcnkpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGl2OiBzdHJpbmcgPSBcIjxkaXYgY2xhc3M9J3ZlbmRvcicgaWQ9J3ZlbmRvclwiICsgdGhpcy5pZCArIFwiJyBkYXRhLXZlbmRvcj0nXCIgKyB0aGlzLmlkICsgXCInID5cIjtcclxuICAgICAgICBkaXYgKz0gXCI8YSBocmVmPSdkZXRhaWwnPlwiOyAgICBcclxuICAgICAgICBkaXYgKz0gdGhpcy5uYW1lICsgXCI8L2E+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuJGRvbSA9ICQoIGRpdiApO1xyXG4gICAgICAgICRwYXJlbnQuYXBwZW5kKCB0aGlzLiRkb20gKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi9Qcm9kdWN0XCI7XHJcbmltcG9ydCB7IEJERCB9IGZyb20gXCIuL0JERFwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCIuL0NhdGVnb3J5XCI7XHJcbmltcG9ydCB7IFZlbmRvciB9IGZyb20gXCIuL1ZlbmRvclwiO1xyXG5pbXBvcnQgeyBBUElTZXJ2aWNlIH0gZnJvbSBcIi4vQVBJU2VydmljZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcblxyXG4gICAgcHVibGljICRpdGVtOiBKUXVlcnk7XHJcbiAgICBwdWJsaWMgJGNvbnRhaW5lcjogSlF1ZXJ5O1xyXG4gICAgcHVibGljICRjYXRlZ29yeV9jb250YWluZXI6IEpRdWVyeTtcclxuICAgIHB1YmxpYyAkYWxsX3ZlbmRvcnM6IEpRdWVyeTtcclxuICAgIHB1YmxpYyAkc2VudGVkX2NvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICAgIHByaXZhdGUgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXTtcclxuICAgIHByaXZhdGUgYWxsX3Byb2R1Y3RzOiBQcm9kdWN0W107XHJcbiAgICBwcml2YXRlIHZlbmRvcnM6IFZlbmRvcltdO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50VmVuZG9yOiBWZW5kb3I7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICAgICAgdGhpcy4kaXRlbSA9ICQoXCIuaXRlbVwiKTtcclxuICAgICAgICB0aGlzLiRpdGVtLnByb3AoXCJkcmFnZ2FibGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChcIi5jb250YWluZXJcIik7XHJcbiAgICAgICAgdGhpcy4kY2F0ZWdvcnlfY29udGFpbmVyID0gJChcIiNzaG9wLWxpc3RcIik7XHJcbiAgICAgICAgdGhpcy4kYWxsX3ZlbmRvcnMgPSAkKFwiI2FsbC12ZW5kb3JzXCIpO1xyXG4gICAgICAgIHRoaXMuJHNlbnRlZF9jb250YWluZXIgPSAkKFwiI3NlbmRlZC1wcm9kdWN0c1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gW107XHJcbiAgICAgICAgdGhpcy5hbGxfcHJvZHVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLnZlbmRvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRBbGxDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRBbGxQcm9kdWN0cygpO1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsVmVuZG9ycygpO1xyXG5cclxuICAgICAgICB0aGlzLmRpc3BsYXlDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5VmVuZG9ycygpO1xyXG5cclxuICAgICAgICBpZiggdGhpcy52ZW5kb3JzLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmVuZG9yID0gdGhpcy52ZW5kb3JzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlQcm9kdWN0c0J5VmVuZG9yKCB0aGlzLmN1cnJlbnRWZW5kb3IgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRWZW5kb3IoKTpWZW5kb3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRWZW5kb3I7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VycmVudFZlbmRvciggdmVuZG9yOlZlbmRvciApe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZlbmRvciA9IHZlbmRvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxQcm9kdWN0cygpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgYXBpOkFQSVNlcnZpY2UgPSBBUElTZXJ2aWNlLmdldFNlcnZpY2UoKTtcclxuICAgICAgICBsZXQgcHJvZHVjdHM6UHJvbWlzZTxhbnk+ID0gYXBpLmdldFdpbmVzKCk7XHJcblxyXG4gICAgICAgIHByb2R1Y3RzXHJcbiAgICAgICAgICAgIC50aGVuKCggcHJvZHVjdHMgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZvciAoIGxldCBwcm9kdWN0IG9mIHByb2R1Y3RzICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRoZV9wcm9kdWN0OiBQcm9kdWN0ID0gbmV3IFByb2R1Y3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3QuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3QubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDYXRlZ29yeUJ5SWQoIHByb2R1Y3QuY2F0ZWdvcnlJZCApXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbF9wcm9kdWN0cy5wdXNoKCB0aGVfcHJvZHVjdCApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxDYXRlZ29yaWVzKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgY2F0ZWdvcmllczogeyBcclxuICAgICAgICAgICAgaWQ6bnVtYmVyLCBcclxuICAgICAgICAgICAgbmFtZTpzdHJpbmdcclxuICAgICAgICB9W10gPSBCREQuY2F0ZWdvcmllcztcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgY2F0ZWdvcnkgb2YgY2F0ZWdvcmllcyApe1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoZV9jYXRlZ29yeTogQ2F0ZWdvcnkgPSBuZXcgQ2F0ZWdvcnkoXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeS5pZCxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5Lm5hbWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLnB1c2goIHRoZV9jYXRlZ29yeSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2F0ZWdvcnlCeUlkKCBpZDpudW1iZXIgKTogQ2F0ZWdvcnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciggbGV0IGNhdGVnb3J5IG9mIHRoaXMuY2F0ZWdvcmllcyApe1xyXG5cclxuICAgICAgICAgICAgaWYoIGlkID09IGNhdGVnb3J5LmdldElkKCkgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYXRlZ29yeTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxWZW5kb3JzKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvL09uIHJlY3VwZXJlIGxlcyB2ZW5kb3JzIGRlIGxhIGJkZCAhICggZmF1c3NlIGJhc2UgZGUgZG9ubsOpZSBCREQpXHJcbiAgICAgICAgbGV0IHZlbmRvcnM6IHtcclxuICAgICAgICAgICAgaWQ6IG51bWJlcixcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBwcm9kdWN0czogbnVtYmVyW11cclxuICAgICAgICB9W10gPSBCREQudmVuZG9ycztcclxuXHJcbiAgICAgICAgLy9PbiBib3VjbGUgc3VyIGNldHRlIGxpc3RlIGRlIHZlbmRldXJzXHJcbiAgICAgICAgZm9yKCBsZXQgdmVuZG9yIG9mIHZlbmRvcnMgKXtcclxuXHJcbiAgICAgICAgICAgIC8vT24gdmEgYXZvaXIgYmVzb2luIGQndW4gdGFibGVhdSBkZSBwcm9kdWl0XHJcbiAgICAgICAgICAgIGxldCB2ZW5kb3JzX3Byb2R1Y3RzOlByb2R1Y3RbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy9KZSBib3VjbGUgc3VyIGxlIHRhYmxlYXUgZCdpZCBkZSB2ZW5kb3IucHJvZHVjdHNcclxuICAgICAgICAgICAgZm9yKCBsZXQgcHJvZHVjdF9pZCBvZiB2ZW5kb3IucHJvZHVjdHMgKXtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0plIGNoZXJjaGUgbGUgcHJvZHVpdCBjb3JyZXNwb25kYW50LCBncmFjZSBhIHNvbiBpZCwgZGFucyBtYSBsaXN0ZSBkZSBwcm9kdWl0XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhlX3Byb2R1Y3Q6UHJvZHVjdCA9IHRoaXMuZ2V0UHJvZHVjdEJ5SWQoIHByb2R1Y3RfaWQgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0plIHBvdXNzZSBtb24gdGFibGVhdSBkJ29iamV0XHJcbiAgICAgICAgICAgICAgICB2ZW5kb3JzX3Byb2R1Y3RzLnB1c2goIHRoZV9wcm9kdWN0ICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSWNpLCBvbiBjcsOpZXIgbGUgdmVuZGV1ciBhdmVjIHNhIGNsYXNzZSBldCBsZSB0YWJsZWF1IGRlIHByb2R1aXQgY3LDqcOpICFcclxuICAgICAgICAgICAgbGV0IHRoZV92ZW5kb3I6VmVuZG9yID0gbmV3IFZlbmRvcihcclxuICAgICAgICAgICAgICAgIHZlbmRvci5pZCxcclxuICAgICAgICAgICAgICAgIHZlbmRvci5uYW1lLFxyXG4gICAgICAgICAgICAgICAgdmVuZG9yc19wcm9kdWN0c1xyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAvL2onYWpvdXRlIG1vbiB2ZW5kZXVyIGEgbWEgbGlzdGUgZGUgdmVuZGV1ciBkZSBtb24gYXBwXHJcbiAgICAgICAgICAgIHRoaXMudmVuZG9ycy5wdXNoKCB0aGVfdmVuZG9yICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvZHVjdEJ5SWQoIGlkOiBudW1iZXIgKTogUHJvZHVjdCB7XHJcblxyXG4gICAgICAgIGZvciggbGV0IHByb2R1Y3Qgb2YgdGhpcy5hbGxfcHJvZHVjdHMgKXtcclxuXHJcbiAgICAgICAgICAgIGlmKCBpZCA9PSBwcm9kdWN0LmdldElkKCkgKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9kdWN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlDYXRlZ29yaWVzKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBmb3IoIGxldCBjYXRlZ29yeSBvZiB0aGlzLmNhdGVnb3JpZXMgKXtcclxuICAgICAgICAgICAgY2F0ZWdvcnkuZGlzcGxheSggdGhpcy4kY2F0ZWdvcnlfY29udGFpbmVyICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5VmVuZG9ycygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgdmVuZG9yIG9mIHRoaXMudmVuZG9ycyApe1xyXG4gICAgICAgICAgICB2ZW5kb3IuZGlzcGxheSggdGhpcy4kYWxsX3ZlbmRvcnMgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyQm9hcmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kc2VudGVkX2NvbnRhaW5lci5odG1sKFwiXCIpO1xyXG4gICAgICAgIGZvciggbGV0IGNhdGVnb3J5IG9mIHRoaXMuY2F0ZWdvcmllcyApe1xyXG4gICAgICAgICAgICBjYXRlZ29yeS5nZXQkRG9tKCkuaHRtbChcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheVByb2R1Y3RzQnlWZW5kb3IoIHZlbmRvcjpWZW5kb3IgKTp2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhckJvYXJkKCk7XHJcblxyXG4gICAgICAgIC8vT24gY2hlcmNoZSBxdWVscyBzb250IGxlcyBwcm9kdWl0cyB2ZW5kdSBldCBub24tdmVuZHVcclxuICAgICAgICBmb3IoIGxldCBwcm9kdWN0IG9mIHRoaXMuYWxsX3Byb2R1Y3RzICl7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmxhZzpib29sZWFuID0gZmFsc2U7Ly90cnVlID0gdmVuZHUsIGZhbHNlID0gbm9uLXZlbmR1XHJcblxyXG4gICAgICAgICAgICBmb3IoIGxldCB2cHJvZHVjdCBvZiB2ZW5kb3IuZ2V0UHJvZHVjdHMoKSApe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCB2cHJvZHVjdC5nZXRJZCgpID09IHByb2R1Y3QuZ2V0SWQoKSApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vT24gYSB0cm91dsOpIGwnw6lsw6ltZW50ICFcclxuICAgICAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCBmbGFnID09IHRydWUgKXtcclxuICAgICAgICAgICAgICAgIC8vYWZmaWNoYWdlIGNvbG9ubmUgZHJvaXRlXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0LmRpc3BsYXkoIHRoaXMuJHNlbnRlZF9jb250YWluZXIgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vYWZmaWNoYWdlIGNvbG9ubmUgZ2F1Y2hlXHJcbiAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcnk6IENhdGVnb3J5ID0gcHJvZHVjdC5nZXRDYXRlZ29yeSgpO1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjdC5kaXNwbGF5KCBjYXRlZ29yeS5nZXQkRG9tKCkgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRWZW5kb3JCeUlkKCBpZF92ZW5kb3I6bnVtYmVyICk6VmVuZG9yIHtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgdmVuZG9yIG9mIHRoaXMudmVuZG9ycyApe1xyXG5cclxuICAgICAgICAgICAgaWYoIHZlbmRvci5nZXRJZCgpID09IGlkX3ZlbmRvciApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZlbmRvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9BcHBcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcclxuaW1wb3J0IHsgVmVuZG9yIH0gZnJvbSBcIi4vVmVuZG9yXCI7XHJcblxyXG52YXIgYXBwOkFwcCA9IG5ldyBBcHAoKTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKFwiZHJhZ292ZXJcIiwgXCIuY29udGFpbmVyXCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkub24oXCJkcmFnc3RhcnRcIiwgXCIuaXRlbVwiLCBmdW5jdGlvbihldmVudCl7ICAgXHJcbiAgICBcclxuICAgIGNvbnN0IGRyYWdFdmVudDogRHJhZ0V2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCBhcyBEcmFnRXZlbnQ7XHJcbiAgICBkcmFnRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoIFwiaWRcIiwgJCh0aGlzKS5kYXRhKFwicHJvZHVjdFwiKSApO1xyXG5cclxufSk7XHJcblxyXG4vL0V2ZW50IGNvbnRhaW5lciBmaXhlIGRlIGRyb2l0ZVxyXG5hcHAuJHNlbnRlZF9jb250YWluZXIub24oXCJkcm9wXCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuXHJcbiAgICBjb25zdCBkcmFnRXZlbnQ6IERyYWdFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgYXMgRHJhZ0V2ZW50O1xyXG4gICAgbGV0IGlkX3Byb2R1Y3Q6IG51bWJlciA9IHBhcnNlSW50KCBkcmFnRXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJpZFwiKSApO1xyXG4gICAgbGV0IHByb2R1Y3Q6IFByb2R1Y3QgPSBhcHAuZ2V0UHJvZHVjdEJ5SWQoIGlkX3Byb2R1Y3QgKTtcclxuICAgIGFwcC5nZXRDdXJyZW50VmVuZG9yKCkuYWRkUHJvZHVjdCggcHJvZHVjdCApO1xyXG4gICAgJCh0aGlzKS5hcHBlbmQoIHByb2R1Y3QuZ2V0JERvbSgpICk7XHJcblxyXG59KTtcclxuXHJcbi8vRXZlbnQgY29udGFpbmVyIGRlcyBjYXRlZ29yaWVcclxuJChkb2N1bWVudCkub24oXCJkcm9wXCIsIFwiLmNvbnRhaW5lci1jYXRcIiwgZnVuY3Rpb24oZXZlbnQpe1xyXG5cclxuICAgIGNvbnN0IGRyYWdFdmVudDogRHJhZ0V2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCBhcyBEcmFnRXZlbnQ7XHJcbiAgICBsZXQgaWRfcHJvZHVjdDogbnVtYmVyID0gcGFyc2VJbnQoIGRyYWdFdmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcImlkXCIpICk7XHJcbiAgICBsZXQgcHJvZHVjdDogUHJvZHVjdCA9IGFwcC5nZXRQcm9kdWN0QnlJZCggaWRfcHJvZHVjdCApO1xyXG4gICAgYXBwLmdldEN1cnJlbnRWZW5kb3IoKS5yZW1vdmVQcm9kdWN0KCBwcm9kdWN0ICk7XHJcbiAgICBwcm9kdWN0LmdldENhdGVnb3J5KCkuZ2V0JERvbSgpXHJcbiAgICAgICAgLmFwcGVuZCggcHJvZHVjdC5nZXQkRG9tKCkgKTtcclxuXHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi52ZW5kb3JcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBsZXQgaWRfdmVuZGV1cjpudW1iZXIgPSAkKHRoaXMpLmRhdGEoXCJ2ZW5kb3JcIik7XHJcbiAgICBsZXQgdmVuZG9yOiBWZW5kb3IgPSBhcHAuZ2V0VmVuZG9yQnlJZCggaWRfdmVuZGV1ciApO1xyXG4gICAgYXBwLnNldEN1cnJlbnRWZW5kb3IoIHZlbmRvciApO1xyXG4gICAgYXBwLmRpc3BsYXlQcm9kdWN0c0J5VmVuZG9yKCBhcHAuZ2V0Q3VycmVudFZlbmRvcigpICk7XHJcblxyXG59KTtcclxuXHJcbiQoXCJhXCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcclxuXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciB0YXJnZXRJZDpzdHJpbmcgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgdmFyICR0YXJnZXQ6SlF1ZXJ5ID0gJChcIiNcIiArIHRhcmdldElkKTtcclxuXHJcbiAgICAkKFwiLnBhZ2VcIikuaGlkZSgpO1xyXG4gICAgJHRhcmdldC5zaG93KCk7XHJcblxyXG59KTsiXX0=
