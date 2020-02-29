(function () {
        angular
            .module("project")
            .controller("informationController", informationController);

        function informationController($location) {
            var vm = this;

            function init() {
                console.log("In informationController")
            }

            init();
        }

    }
)();