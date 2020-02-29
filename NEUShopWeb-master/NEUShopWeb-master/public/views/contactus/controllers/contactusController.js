(function () {
        angular
            .module("project")
            .controller("contactusController", contactusController);

        function contactusController($location) {
            var vm = this;
            vm.submit = submit;

            function init() {
                vm.firstname = "";
                console.log("In contactusController");
            }

            init();

            function submit(form) {

                if(!form.$valid)
                {
                    alert("Please complete the form!");
                }
                else
                {
                    alert("Thanks for completing the form");
                    document.getElementById("contactForm").reset();
                }
            }
        }

    }
)();