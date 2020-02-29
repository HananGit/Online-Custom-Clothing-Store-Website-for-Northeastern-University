(function () {
    angular
        .module("project")
        .controller("homepageController", homepageController);

    function homepageController($location) {
        var vm = this;

        function init() {
            console.log("In homepageController")
        }

        init();
    }

}
)();