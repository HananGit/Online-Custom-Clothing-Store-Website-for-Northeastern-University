var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Getting the Mongoose db userModel from the user.Model

module.exports = function (app, models) {

    var userModelProject = models.userModelProject;

    app.post("/api/project/user", createUser);
    app.post("/api/project/login", passport.authenticate('project'), projectLogin);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.get('/api/project/loggedIn', loggedIn);
    app.get("/api/project/user", getUser);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/project/#/user',
        failureRedirect: '/project/#/login'
    }));
    app.get("/auth/google", passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get("/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    app.get("/api/project/admin/users", getAllUsers);
/*

    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    };

    passport.use('google', new GoogleStrategy(googleConfig, googleStrategy));

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };


    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
*/

    function getAllUsers(req, res) {
        /*userModelProject
            .getUsers()
            .then(
                function (users) {
                    res.send(users);
                },
                function (error) {
                    res.send([]);
                }
            );*/
        res.send(200);
    }

    passport.use('project', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
       userModelProject
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        done(err);
                    }
                }
            );

    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
       userModelProject
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );

    }

    function loggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function projectLogin(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        console.log("In register");
        var username = req.body.username;
        // var password = req.body.password;
        var users = req.body;
        // console.log(users);


        userModelProject
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        // console.log("Username exists error.")
                        res.status(400).send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModelProject
                            .createUser(users);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )

        // res.send(200);
        // console.log("In register - /api/project/register");
    }


    function googleStrategy(token, refreshToken, profile, done) {
        /*userModelProject
            .findUserByGoogleId(profile.id)
            .then(
                function (googleUser) {
                    if (googleUser) {
                        done(null, googleUser);
                    } else {
                        var email = profile.emails[0].value;
                        console.log(email);
                        var emailParts = email.split("@");
                        googleUser = {
                            username: emailParts[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };
                        userModelProject.createUser(googleUser)
                            .then(function (user) {
                                done(null, user);
                            })
                    }
                });*/
        done(null);
    }


    function facebookStrategy(token, refreshToken, profile, done) {

        /*userModelProject
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = {
                        username: profile.displayName.replace(/ /g, ""),
                        facebook: {
                            token: token,
                            id: profile.id
                        }
                    };
                    userModelProject
                        .createUser(newUser)
                        .then(function (user) {
                            return done(null, user);
                        }, function (err) {
                            return done(err, null);
                        });
                }
            }, function (err) {
                return done(err, null);
            });*/
        done(null);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModelProject
            .deleteUser(userId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModelProject
            .updateUser(userId, user)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );

    }

    function createUser(req, res) {
        var user = req.body;
        userModelProject
            .createUser(user)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )

    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModelProject
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            )

    }

    function getUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(username, password, res);
        }  else {
            res.send(null);
        }
        res.send(200);
    }

    function findUserByCredentials(username, password, res) {
        userModelProject
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );

    }
    function findUserByUsername(username, res) {
        userModelProject
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }
};