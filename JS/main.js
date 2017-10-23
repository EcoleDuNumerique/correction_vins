System.register("App", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var App;
    return {
        setters: [],
        execute: function () {
            App = class App {
                constructor() {
                    this.$item = $(".item");
                    this.$item.prop("draggable", true);
                    this.$container = $(".container");
                }
            };
            exports_1("App", App);
        }
    };
});
System.register("main", ["App"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL0FwcC50cyIsIlRTL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBLE1BQUE7Z0JBS0k7b0JBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7YUFFSixDQUFBOztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O1lDVEUsR0FBRyxHQUFPLElBQUksU0FBRyxFQUFFLENBQUM7WUFFeEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVMsS0FBSztnQkFDeEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVMsS0FBSztnQkFFcEMsTUFBTSxTQUFTLEdBQWMsS0FBSyxDQUFDLGFBQTBCLENBQUM7Z0JBQzlELFNBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7WUFFL0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBUyxLQUFLO2dCQUVwQyxNQUFNLFNBQVMsR0FBYyxLQUFLLENBQUMsYUFBMEIsQ0FBQztnQkFDOUQsTUFBTSxFQUFFLEdBQVcsU0FBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sUUFBUSxHQUFXLENBQUMsQ0FBQyxHQUFHLEdBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sV0FBVyxHQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRS9DLEVBQUUsQ0FBQSxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQSxDQUFDO29CQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFFLFFBQVEsQ0FBRSxDQUFDO2dCQUMvQixDQUFDO2dCQUNELElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBRSxRQUFRLENBQUMsUUFBUSxDQUFFLFdBQVcsQ0FBRyxDQUFDLENBQUEsQ0FBQztvQkFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBRSxRQUFRLENBQUUsQ0FBQztnQkFDL0IsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFwcCB7XHJcblxyXG4gICAgcHVibGljICRpdGVtOiBKUXVlcnk7XHJcbiAgICBwdWJsaWMgJGNvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy4kaXRlbSA9ICQoXCIuaXRlbVwiKTtcclxuICAgICAgICB0aGlzLiRpdGVtLnByb3AoXCJkcmFnZ2FibGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChcIi5jb250YWluZXJcIik7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vQXBwXCI7XHJcblxyXG52YXIgYXBwOkFwcCA9IG5ldyBBcHAoKTtcclxuXHJcbmFwcC4kY29udGFpbmVyLm9uKFwiZHJhZ292ZXJcIiwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxufSk7XHJcblxyXG5hcHAuJGl0ZW0ub24oXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQpe1xyXG5cclxuICAgIGNvbnN0IGRyYWdFdmVudDogRHJhZ0V2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCBhcyBEcmFnRXZlbnQ7XHJcbiAgICBkcmFnRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoIFwiaWRcIiwgJCh0aGlzKS5hdHRyKFwiaWRcIikgKTtcclxuXHJcbn0pO1xyXG5cclxuYXBwLiRjb250YWluZXIub24oXCJkcm9wXCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuXHJcbiAgICBjb25zdCBkcmFnRXZlbnQ6IERyYWdFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQgYXMgRHJhZ0V2ZW50O1xyXG4gICAgY29uc3QgaWQ6IHN0cmluZyA9IGRyYWdFdmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcImlkXCIpO1xyXG4gICAgY29uc3QgJGVsZW1lbnQ6IEpRdWVyeSA9ICQoXCIjXCIraWQpO1xyXG4gICAgY29uc3QgY29udGFpbmVySWQ6IHN0cmluZyA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG5cclxuICAgIGlmKCAkKHRoaXMpLmhhc0NsYXNzKFwidmVuZG9yXCIpICl7XHJcbiAgICAgICAgJCh0aGlzKS5hcHBlbmQoICRlbGVtZW50ICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKCAkZWxlbWVudC5oYXNDbGFzcyggY29udGFpbmVySWQgKSApe1xyXG4gICAgICAgICQodGhpcykuYXBwZW5kKCAkZWxlbWVudCApO1xyXG4gICAgfVxyXG5cclxufSk7Il19
