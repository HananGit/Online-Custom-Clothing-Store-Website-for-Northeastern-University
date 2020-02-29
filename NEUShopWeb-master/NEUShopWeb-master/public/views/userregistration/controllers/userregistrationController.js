(function () {
        angular
            .module("project")
            .controller("userregistrationController", userregistrationController);

        function userregistrationController($location, UserService) {
            var vm = this;
            vm.submit = submit;

            function init() {
                console.log("In userregistrationController");
            }

            init();

            function submit(form) {

                if(!form.$valid)
                {
                    alert("Please complete the form!");
                }
                else
                {
                    UserService
                        .register(form)
                        .then(function (response) {
                                var reg = response.data;
                                if (reg) {
                                    console.log("Successful");
                                } else {
                                    console.log("Unsuccesful reg");
                                }
                            },
                            function (error) {

                            });
                    alert("Thanks for completing the registration");
                    document.getElementById("userform").reset();
                }
            }
        }

    }
)();