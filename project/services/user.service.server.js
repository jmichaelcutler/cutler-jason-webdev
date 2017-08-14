var app = require('../../express');
var userModel = require("../model/user/user.model.server");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var bcrypt = require("bcrypt-nodejs");
var auth = authorized;

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
};

passport.use(new LocalStrategy([], localStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.post('/api/project/login', passport.authenticate("MusicDBApp"), login);
app.post('/api/project/logout', logout);
app.get('api/admin', checkAdmin);
app.post('/api/project/register', register);
app.get('/api/project/loggedin', loggedin);
app.post("/api/project/user", createUser);
app.get("/api/project/user?username", findUserByUsername);
app.get("/api/project/user?", findAllUsers);
app.get("/api/project/artist?username", findArtistByUsername);
app.get("/api/project/artist?", findAllArtists);
app.get("/api/project/user/:userId", findUserById);
app.put("/api/project/user/:userId", updateUser);
app.delete("/api/project/user/:userId", deleteUser);
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            if (user !== null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, userError(err, res));
}

function findUserByUsername(req, res) {
    var username = req.query["username"];
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user !== null) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        }, userError(err, res));
}

function findAllUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var userType = req.query.roles;
    if (username && password && (userType === 'USER' )) {
        return findUserByCredentials(req, res);
    }
    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (user !== null) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        }, userError(err, res));
}

function findArtistByUsername(req, res) {
    return findUserByUsername(req, res);
}

function findAllArtists(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var userType = req.query.roles;
    if (username && password && userType === 'ARTIST') {
        return findUserByCredentials(req, res);
    }
    userModel
        .findAllArtists()
        .then(function (artists) {
            res.json(artists);
        })
}
function findUserById(req, res) {
    var userId = req.params["userId"];
    userModel
        .findUserById(userId)
        .then(function (user) {
            if (user !== null) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        }, userError(err, res));
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(status);
        }, userError(err, res));
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(status);
        }, userError(err, res));
}

function userError(err, res) {
    res.sendStatus(404);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function (user) {
            done(null, user);
        }, function (err) {
            done(err, null);
        });
}

function login(req, res) {
    var user = req.user;
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json(user);
    } else {
        done(null, false);
    }
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            if (user) {
                req.login(user, function (err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function (user) {
                if (user.username === username && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function checkAdmin(req, res) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}