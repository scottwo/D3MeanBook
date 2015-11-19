module.exports = {
    db : 'mongodb://localhost/testNodes',
    sessionSecret : 'developmentSecret',
    facebook : {
        clientID: '925858337494261',
        clientSecret: '3b81242d380f1449dc2cf3a097c3edf9',
        redirect_uri: 'http://localhost:3000/oauth/facebook/callback/'
    },
    twitter : {},
    google: {
        clientID: '778025749273-t4sh5n8aobv6oucf2043m7k9eg5j19p8.apps.googleusercontent.com',
        clientSecret: 'FgcyvguhI80kPW0vCW1lCL0O',
        callbackURL: 'http://localhost:3000/oauth/google/callback/'
    }
}