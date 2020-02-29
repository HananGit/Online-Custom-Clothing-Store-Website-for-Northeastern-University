(function () {
        angular
            .module("project")
            .controller("appointmentController", appointmentController);

        function appointmentController($location) {
            var vm = this;

            function init() {
                console.log("In appointmentController")
            }

            init();
        }

    }
)();