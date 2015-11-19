var Node = require('mongoose').model('Node'),
    passport = require('passport');

var getErrorMessage = function(err) {
    var message = '';
                                                            //Not sure what to do with this. I'll figure it out after I get some Node errors back from mongoose
    if(err.code) {
        switch(err.code) {
            case 11000:
            case 11001:
                message = 'Node(?) already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for(var errName in  err.errors) {
            if(err.errors[errName].message) message = err.errors[errName];
        }
    }
    return message;
}

//exports.saveOAuthUserProfile = function(req, profile, done) {
//    User.findOne({
//        provider: profile.provider,
//        providerId: profile.providerId                                I don't think I need this here.
//    },function(err, user){
//        if(err) {
//            return done(err);
//        } else {
//            if(!user) {
//                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
//                
//                User.findUniqueUsername(possibleUsername, null, 
//                   function(availableUsername){
//                        profile.username = availableUsername;
//                    
//                        user = new User(profile);
//                        
//                        user.save(function(err) {
//                            return done(err, user);
//                        });
//                    });
//            } else {
//                return done(err, user);
//            }
//        }
//    });
//};

//exports.renderSignin = function(req, res, next) {
//    if(!req.user) {
//        res.render('signin', {
//            title: 'Sign-in Form', 
//            messages: req.flash('error') || req.flash('info')
//        });
//    } else {
//        return res.redirect('/');
//    }
//};
//
//exports.renderSignup = function(req, res, next) {
//    if(!req.user) {
//        res.render('signup', {
//            title: 'Sign-up Form',
//            messages: req.flash('error')
//        });
//    } else {
//        return res.redirect('/');
//    }
//};
//                                                              Don't think I need these, either. Delete leter once the CRUD is working for Nodes
//exports.signup = function(req, res, next) {
//    if(!req.user) {
//        var user = new User(req.body),
//            message = null;
//        
//        user.provider = 'local';
//        
//        user.save(function(err){
//            if(err) {
//               var message = getErrorMessage(err);
//               
//               req.flash('error', message);
//               return res.redirect('/signup');
//            } 
//            req.login(user, function(err){
//                if(err) return next(err);
//                return res.redirect('/');
//            });
//        });
//    } else {
//        return res.redirect('/');
//    }
//}
//
//exports.signout = function(req, res){
//    req.logout();
//    res.redirect('/');
//};

exports.create = function(req, res, next) {
    var node = new Node(req.body);
    node.save(function(err){
        if(err){
            return next(err);
        } else {
            res.json(user);
        }
    })
}

exports.list = function(req, res, next) {
    User.find({}, 'username email', function(err, users){
        if(err){
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.read = function(req, res, next) {
    res.json(req.user);
};

//exports.userByID = function(req, res, next, id){
//    User.findOne({
//        _id : id
//    }, function(err, user){
//        if (err) {
//            return next(err);
//        } else {                                                  Don't think I'll be looking for specific nodes. I think I'll be reading them all at once.
//            req.user = user;
//            next();
//        }
//    });  
//};

exports.update = function(req, res, next){
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
        if (err) {
            return next(err);   
        } else {
            res.json(user);
        }
    });
};

exports.delete = function(req, res, next) {
    req.user.remove(function(err){
        if(err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    });
};