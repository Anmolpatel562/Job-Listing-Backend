const Job = require("../models/Job");

const getAllJobs = async(req,res,next) => {
  try{
     const searchCompany = req.query.companyname || "";
     const searchQuery = req.query.searchPosition || "";
     const skills = req.query.skills;
   
     console.log(searchCompany);

     let filteredSkills ;
     let filter = {};

     if(skills && skills.length > 0){
        filteredSkills = skills.split(",");
        const regExpSkills = filteredSkills.map((skill) => new RegExp(skill,"i"));
        filteredSkills = regExpSkills;
        filter = { skills: {$in: filteredSkills}};
     }

     const jobs = await Job.find({
      companyName:{$regex: searchCompany , $options:"i"},
      position:{$regex:searchQuery , $options:"i"},
      ...filter,
     });
     res.status(200).json({
      message:"All Jobs Fetched.",
      data:jobs,
     })
  }catch(error){
    next(error);
  }
}

const createJobPost = async (req, res, next) => {
  const userId = req.currentUserId;
  try {
    const {
      companyName,
      logoURL,
      position,
      salary,
      location,
      locationType,
      jobType,
      description,
      aboutCompany,
      skills,
      information,
    } = req.body;

    if (
      !companyName ||
      !position ||
      !salary ||
      !location ||
      !locationType ||
      !jobType ||
      !description ||
      skills.length == 0
    ) {
      res.status(400).json({
        message:"Please Enter all the (mandatory)* fields (if already entered then press add job again.)!!"
      })
      return;
    }

    var positionAtCompanyName = position+` at ${companyName}`;
    var positionAtLocation = positionAtCompanyName + ` ${location}`;

    await Job.create({
      companyName,
      logoURL,
      position:positionAtLocation,
      salary,
      location,
      locationType,
      jobType,
      description,
      aboutCompany,
      skills,
      information,
      refUserId:userId
    });
    res.status(200).json({
      message: "Job Posted Successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getJobDetailsById = async (req,res,next) => {
  try{
    const jobId  = req.params.jobId;
    const userId = req.params.userId;
  
    const jobDetails = await Job.findOne({_id:jobId});
    
    let isEditable = false;

    if(jobDetails.refUserId.toString() === userId){
       isEditable = true;
    }
    res.status(200).json({
      message:"Details fetched Successfully.",
      isEditable:isEditable,
      data:jobDetails,
    })
  }catch(error){
    res.status(500).json({
      message:"Failed to fetch details !!",
    })
  }
};

module.exports = { createJobPost, getAllJobs, getJobDetailsById};
