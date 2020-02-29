(function () {
    angular
        .module("project")
        .controller("userController", userController);

    function userController($location, $rootScope, OrderService, UserService, $mdSidenav, ProductService) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.favList = [];
        vm.orderList = [];
        vm.getUserOrders = getUserOrders;
        vm.cancelOrder = cancelOrder;


        function getUserOrders() {

            OrderService
                .getUserOrders(vm.currentUser._id)
                .then(function (response) {

                        if (response.data) {
                            vm.orderList =[];
                            for(var i=0;i<response.data.length;i++)
                            {
                                var products =[];
                                for(var j=0;j<response.data[i].product.length;j++)
                                {
                                    products.push(JSON.parse(response.data[i].product[j]));
                                }

                                var orderObj={
                                    orderDateTime: response.data[i].orderDateTime,
                                    status: response.data[i].status,
                                    total: response.data[i].total,
                                    productList: products,
                                    user:  response.data[i].user,
                                    order: response.data[i]._id
                                }
                                vm.orderList.push(orderObj);
                            }
                        }
                    },
                    function (error) {
                        vm.error = "some error";
                    });

        }

        function cancelOrder(order) {

            OrderService
                .cancelUserOrder(order)
                .then(function (response) {

                        //vm.orderList = response.data;
                    },
                    function (error) {
                        vm.error = "Invalid Credentials"
                    });

        }

        $(".btn-pref .btn").click(function () {
            $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
            // $(".tab").addClass("active"); // instead of this do the below
            $(this).removeClass("btn-default").addClass("btn-primary");
        });

        function init() {
            if ($rootScope.favList === undefined) {
                $rootScope.favList = [];
            }
            if ($rootScope.currentUser === undefined) {
                $rootScope.currentUser = {};
            }
            vm.currentUser = $rootScope.currentUser;
            vm.favList = $rootScope.favList;
            vm.getUserOrders();
            console.log("In userController")
        }

        init();


        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        vm.toggleLeft = buildToggler('left');
        vm.toggleRight = buildToggler('right');
    }

})();
