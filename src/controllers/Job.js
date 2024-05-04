const Job = require("../models/Job");

const getAllJobs = async (req, res, next) => {
  try {
    const searchCompany = req.query.companyname || "";
    const searchQuery = req.query.searchPosition || "";
    const skills = req.query.skills;
    let filteredSkills;
    let filter = {};

    if (skills && skills.length > 0) {
      filteredSkills = skills.split(",");
      const regExpSkills = filteredSkills.map(
        (skill) => new RegExp(skill, "i")
      );
      filteredSkills = regExpSkills;
      filter = { skills: { $in: filteredSkills } };
    }

    const jobs = await Job.find({
      companyName: { $regex: searchCompany, $options: "i" },
      allInformation: { $regex: searchQuery, $options: "i" },
      ...filter,
    });
    res.status(200).json({
      message: "All Jobs Fetched.",
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

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
        message:
          "Please Enter all the (mandatory)* fields (if already entered then press add job again.)!!",
      });
      return;
    }

    var allInformationAboutJob = `${position} at ${companyName} ${location}`;

    await Job.create({
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
      refUserId: userId,
      allInformation: allInformationAboutJob,
    });
    res.status(200).json({
      message: "Job Posted Successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getJobDetailsById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.params.userId;

    const jobDetails = await Job.findOne({ _id: jobId });

    let isEditable = false;

    if (jobDetails.refUserId.toString() === userId) {
      isEditable = true;
    }
    res.status(200).json({
      message: "Details fetched Successfully.",
      isEditable: isEditable,
      data: jobDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch details !!",
    });
  }
};

const updateJobPost = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    console.log(req.body);
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
      information
    } = req.body;

    const prevDetails = await Job.findById(jobId);
    var allInformationAboutJob = `${
      position ? position : prevDetails.position
    } at ${companyName ? companyName : prevDetails.companyName} ${
      location ? location : prevDetails.location
    }`;

    await Job.findByIdAndUpdate(jobId, {
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
      allInformation:allInformationAboutJob
    });
    res.status(200).json({
      message: "Job Post Updated Succesfully.",
    });
  } catch (error) {
    next(error);
  }
};

const deleteJobPost = async (req,res,next) => {
  try{
    const {jobId} = req.params;
    await Job.findByIdAndDelete(jobId);
    res.status(200).json({
      message:"Job post deleted successfully.",
    })
  }catch(error){
    console.log(error);
    next(error);
  }
}

module.exports = {
  createJobPost,
  getAllJobs,
  getJobDetailsById,
  updateJobPost,
  deleteJobPost
};
