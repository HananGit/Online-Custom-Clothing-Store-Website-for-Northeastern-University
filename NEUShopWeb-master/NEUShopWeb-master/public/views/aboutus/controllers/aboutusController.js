(function () {
        angular
            .module("project")
            .controller("aboutusController", aboutusController);

        function aboutusController($location) {
            var vm = this;

            function init() {
                console.log("In aboutusController")
            }

            init();
        }

    }
)();