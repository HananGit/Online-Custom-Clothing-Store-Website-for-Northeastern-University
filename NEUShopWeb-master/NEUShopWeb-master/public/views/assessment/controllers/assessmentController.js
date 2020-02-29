(function () {
        angular
            .module("project")
            .controller("assessmentController", assessmentController);

        function assessmentController($location) {
            var vm = this;

            function init() {
                console.log("In assessmentController")
            }

            init();
        }

    }
)();