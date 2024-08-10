
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Job = require('../../schema/job');
const { findByIdAndDelete } = require('../../schema/user');

dotenv.config();


router.post('/create', async (req, res) => {

  try {
    const { Name, logo, position, salary, jobType, remote, description, about, skills, information } = req.body;
    const user = req.user;
    const userId = user._id;
    const skillArray = skills.split(",").map((skill) => skill.trim());
    const NewJob = new Job({
      companyName: Name,
      logo,
      position,
      salary,
      jobType,
      remote,
      description,
      about,
      skills: skillArray,
      information,
      userId
    });

    console.log(NewJob);
    await NewJob.save();
    res.status(200).send("Job created");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.patch('/update/:id', async (req, res) => {
  
  try {
    const id = req.params.id;
    const { Name, logo, position, salary, jobType, remote, description, about, skills, information } = req.body;
    const defaultJob = await Job.findById(id)
    const user = req.user;
    userId = user._id;

    if(defaultJob.userId.toString != userId.toString() ) {
      return res.status(403).send("Access denied ")
    }

     console.log("defaultJob",defaultJob)
    if (!id) {
      return res.status(400).send("ID is required");
    }

    const skillArray = skills ? skills.split(",").map((skill) => skill.trim()) : [];

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        companyName: Name || defaultJob.Name,
        logo:  logo || defaultJob.logo,
        position :position || defaultJob.position,
        salary : salary || defaultJob.salary ,
        jobType : jobType|| defaultJob.jobType,
        remote :remote || defaultJob.remote,
        description : description || defaultJob.remote,
        about :about || defaultJob.about,
        skills: skillArray.length > 0 ? skillArray : undefined,
        information :information || defaultJob.information
      },
      { new: true } // This option returns the updated document
    );

    console.log("updatedJob",updatedJob);

    if (!updatedJob) {
      return res.status(404).send("Job not found");
    }

    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// router.delete('/delete/:id', async (req, res, next) => {
//   try {
//     const userId = req.user._id;
   
//     const id = req.params.id;
//     if (!id) {
//       return res.status(403).send("Wrong request");
//     }
//     defaultJob = await Job.findById(id);

//     if(defaultJob.userId.toString() != userId.toString())

//     await Job.findByIdAndDelete(id);
//     res.status(200).json({ message: "Job deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// });


router.delete('/delete/:id', async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming req.user is populated by middleware

    const id = req.params.id;
    if (!id) {
      return res.status(403).send("Wrong request");
    }
    
    const defaultJob = await Job.findById(id);
    
    if (!defaultJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (defaultJob.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this job" });
    }

    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
});

   
router.get('/get/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("ID is required");
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).send("Job not found");
    }

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
});

router.get('/get-all-jobs', async (req, res, next) => {
  try {
    const jobs = await Job.find().select('logo position salary');
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
});


// filter the job based on skill

router.get('/filter/:skills', async (req, res) => {
  try {
    const skills = req.params.skills;
    if (!skills) {
      return res.status(400).send("Skills are required");
    }

    const skillsArray = skills.split(",").map(skill => skill.trim());
    const jobs = await Job.find({ skills: { $in: skillsArray } }).select("companyName logo position");

    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


//Searching based on JobType, position, name

router.get('/search/:query',async (req,res,next)=>{
  try{
    const query = req.params.query;
    const jobs = await Job.find({
            $or :[
                {companyName :{$regex: query,$options: 'i' }},
                {position :{$regex: query,$options: 'i' }},
                {jobType :{$regex: query,$options: 'i' }},
                {description :{$regex: query,$options: 'i' }}

            ]

    }).select("companyName logo position")
     res.status(200).json(jobs)
  }
  catch(err){
    next(err)
  }
})


module.exports = router;
