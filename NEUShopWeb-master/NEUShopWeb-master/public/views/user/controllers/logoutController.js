(function () {
    angular
        .module("project")
        .controller("logoutController", logoutController)

    function logoutController($location, UserService, $rootScope) {
        var vm = this;
        vm.logout = logout;

        function init() {
            console.log("In logoutController");
            vm.logout();
        }

        init();


        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/home");
                        $rootScope.currentUser = null
                    },
                    function () {
                        $location.url("/home");
                        $rootScope.currentUser = null
                    }
                );

        };
    }
})();