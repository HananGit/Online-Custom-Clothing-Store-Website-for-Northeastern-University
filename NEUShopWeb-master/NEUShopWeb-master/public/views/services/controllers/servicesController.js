(function () {
        angular
            .module("project")
            .controller("servicesController", servicesController);

        function servicesController($location) {
            var vm = this;

            function init() {
                console.log("In servicesController")
            }

            init();
        }

    }
)();