(function () {
    angular
        .module("project")
        .config(configuration);

    function configuration($routeProvider, $mdThemingProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: 'views/homepage/templates/homepage.view.client.html',
                controller: 'homepageController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/userreg", {
                templateUrl: 'views/userregistration/templates/userregistration.view.client.html',
                controller: 'userregistrationController',
                controllerAs: 'model'
            })
            .when("/user", {
                templateUrl: "views/user/templates/user.view.client.html",
                controller: "userController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/logout", {
                templateUrl: "views/user/templates/logout.view.client.html",
                controller: "logoutController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/aboutus", {
                templateUrl: 'views/aboutus/templates/aboutus.view.client.html',
                controller: 'aboutusController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/assessment", {
                templateUrl: 'views/assessment/templates/assessment.view.client.html',
                controller: 'assessmentController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/appointment", {
                templateUrl: 'views/appointment/templates/appointment.view.client.html',
                controller: 'appointmentController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/faq", {
                templateUrl: 'views/faq/templates/faq.view.client.html',
                controller: 'faqController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/contactus", {
                templateUrl: 'views/contactus/templates/contactus.view.client.html',
                controller: 'contactusController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/information", {
                templateUrl: 'views/information/templates/information.view.client.html',
                controller: 'informationController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/product", {
                templateUrl: 'views/product/templates/product.view.client.html',
                controller: 'productController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/checkoutcart", {
                templateUrl: 'views/checkoutcart/templates/checkoutcart.view.client.html',
                controller: 'checkoutcartController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .when("/services", {
                templateUrl: 'views/services/templates/services.view.client.html',
                controller: 'servicesController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLogged
                }
            })
            .otherwise({redirectTo : '/home'});
        $mdThemingProvider.theme('dark-red').backgroundPalette('red');
        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    }

    function checkLoggedIn($q, $location, $rootScope, UserService) {
        var deferred = $q.defer();

        UserService
            .loggedIn()
            .then(
                function (response) {
                    var user = response.data;
                    if (user == '0') {
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("/login");
                    } else {
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                },
                function (error) {
                    $location.url("/login");
                }
            );

        return deferred.promise;
    };

    function checkLogged($q, $location, $rootScope, UserService) {

        UserService
            .loggedIn()
            .then(
                function (response) {
                    var user = response.data;
                    if (user == '0') {
                        $rootScope.currentUser = null;
                    } else {
                        $rootScope.currentUser = user;
                    }
                },
                function (error) {
                }
            );

    };



})();