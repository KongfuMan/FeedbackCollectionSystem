const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys'); //be careful here, we should import from mongoose model

module.exports = app =>{
    app.get('/api/surveys/:surveyId/:choice',(req,res)=>{
        res.send('Thanks for your feedback!');
    });

    app.get('/api/surveys',async (req,res)=>{
        const surveys = await Survey.find({_user: req.user.googleId}).select({
            recipients: false
        });
        console.log(surveys)
        res.send(surveys);
    })

    app.post('/api/surveys/webhooks',(req,res)=>{
        const p = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
            .map(({email, url})=>{
            const match = p.test(new URL(url).pathname);
            if (match){
                return {email, surveyId: match.surveyId, choice: match.choice};
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({surveyId,email,choice}) =>{
            Survey.updateOne({
                _id: surveyId,
                recipients:{
                    $elemMatch:{email, responded: false}
                }
            },{
                $inc: { [choice] : 1},
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec();
        })
        .value();
        return res.send({});
    });

    app.post('/api/surveys', requireLogin,requireCredits, async (req,res)=>{
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title:title,
            subject:subject,
            body:body,
            recipients:recipients.split(',').map(email=>({email})),
            _user:req.user.id,
            dateSent: Date.now()
        });

        //Great place to send emails
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save(); //wait until send() finishes executing and sendback response, then save survey to database
            req.user.credits -= 1; //after the survey has aleady been saved, we substract credits by 1;
            const user = await req.user.save(); //user then becomes stale
            res.send(user);
        }catch (err){
            res.statusCode(422).send(err);
        }
    });
}