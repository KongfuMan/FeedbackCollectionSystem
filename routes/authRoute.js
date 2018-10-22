const passport = require('passport');

// const sleep = (milliseconds) => {
//     return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google',{
            scope: ['profile', 'email']
        })
    );

    //passport.authenticate('google') IS A MIDDLEWARE
    //AFTER google finished authentication, the pass the request on to
    // the next middleware in the chain
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res)=>{
            res.redirect('/surveys');
        }
    );

    app.get('/api/current_user', (req,res)=>{
        // sleep(5000).then(() => {
        //     res.send(req.user);
        // });
        res.send(req.user);

    })

    app.get('/api/logout', (req,res)=>{
        req.logout();
        // res.send(req.user);
        res.redirect('/');
    })

    app.get('/auth/facebook', passport.authenticate('facebook',{
            scope: ['email']
        })
    );

    app.get('/auth/facebook/callback', passport.authenticate('facebook'));

}

