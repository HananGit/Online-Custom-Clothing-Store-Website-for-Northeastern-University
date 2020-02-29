(function () {
    angular
        .module("project")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            login: login,
            logout: logout,
            register: register,
            loggedIn: loggedIn,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            getUsers: getUsers
        };

        return api;

        function getUsers() {
            return $http.get('/api/project/admin/users');
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function loggedIn() {
            return $http.get('/api/project/loggedIn');
        }

        function logout(user) {
            return $http.post("/api/project/logout");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/login", user);
        }


        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }

        function updateUser(userId, newUser) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, newUser);
        }

        function createUser(newUser) {
            return $http.post("/api/project/user", newUser);
        }

    }

})();