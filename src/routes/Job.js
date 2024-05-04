const express = require('express');
const route = express.Router();
const {createJobPost, getAllJobs, getJobDetailsById, updateJobPost, deleteJobPost} = require('../controllers/Job');
const verifyLoggedIn = require('../middlewares/verifyLoggedIn');

route.post('/createJobPost',verifyLoggedIn,createJobPost);
route.get('/getAllJobs',getAllJobs);
route.get('/getJobDetailsById/:jobId/:userId',getJobDetailsById);
route.put('/updateJobPost/:jobId',updateJobPost)
route.delete('/deleteJobPost/:jobId',deleteJobPost);

module.exports = route;