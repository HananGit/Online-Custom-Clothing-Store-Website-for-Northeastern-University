(function () {
    angular
        .module("project")
        .controller("loginController", loginController)

    function loginController($location, UserService, toaster, $rootScope) {
        var vm = this;
        vm.login = login;
        vm.submit = submit;

        function init() {
            console.log("In loginController")
        }

        $('.toggle').on('click', function() {
            $('.containerUser').stop().addClass('active');
        });

        $('.close').on('click', function() {
            $('.containerUser').stop().removeClass('active');
        });

        init();

        function login(username, password) {
            if (username === "" || username == null) {
                vm.error = "Username cannot be blank !";
                toaster.pop('error', "Error", "Username cannot be blank !");
            } else if (password === "" || password == null) {
                toaster.pop('error', "Error", "Password cannot be blank !");
            } else {
                UserService
                    .login(username, password)
                    .then(function (response) {
                            var user = response.data;
                            if (user) {
                                $location.url("/user");
                                toaster.pop('info', "Welcome", "Welcome to Northeastern!");
                            } else {
                                vm.error = "Invalid Credentials";
                                toaster.pop('error', "Error", "Please check your credentials!");
                            }
                        },
                        function (error) {
                            vm.error = "Invalid Credentials";
                            toaster.pop('error', "Error", "Please check your credentials!");
                        });
            }
        }

        function submit(form) {

            if(!form.$valid)
            {
                alert("Please complete the form!");
            }
            else
            { var user = {
                firstName: form.firstName.$modelValue,
                lastName: form.lastName.$modelValue,
                password: form.password.$modelValue,
                username: form.username.$modelValue,
                };
            try {
                UserService
                    .register(user)
                    .then(function (response) {
                            var reg = response.data;
                            if (reg) {
                                console.log("Successful");
                                toaster.pop('info', "Gracis", "Successfully Registered! Please Log In to order :)");
                                UserService
                                    .logout()
                                    .then(
                                        function (response) {
                                            $rootScope.currentUser = null
                                        },
                                        function () {
                                            $rootScope.currentUser = null
                                        }
                                    );
                            } else {
                                console.log("Unsuccesful reg");
                                toaster.pop('error', "Error", "Error in registration!");
                            }
                        },
                        function (error) {
                            if (error.status === 400) {
                                toaster.pop('error', "Registration Error", "Username already registered!");
                            }
                            else {
                                toaster.pop('error', "Registration Error", "Error in registration!");
                            }

                        });
            }
            catch(e)
            {
                console.log(e.message);
            }
                document.getElementById("userform").reset();

            }
        }
    }
})();
