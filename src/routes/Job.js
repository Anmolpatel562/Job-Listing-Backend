const express = require('express');
const route = express.Router();
const {createJobPost, getAllJobs, getJobDetailsById} = require('../controllers/Job');
const verifyLoggedIn = require('../middlewares/verifyLoggedIn');

route.post('/createJobPost',verifyLoggedIn,createJobPost);
route.get('/getAllJobs',getAllJobs);
route.get('/getJobDetailsById/:jobId/:userId',getJobDetailsById);

module.exports = route;