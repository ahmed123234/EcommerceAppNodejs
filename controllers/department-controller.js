const departmentModel = require('../models/department-model');

addDepartment = async (req, res) => {
    const department = req.body;
    const department_ = new departmentModel(department);

   const result = await department_.save();

   res.status(201).send(result);
}


addMultipleDepartments = async (req, res) => {
    const departments = req.body;
    const countries_ = [];

    departments.forEach(department => {

        const department_ = new departmentModel(department);
        department_.save().then((result) => {
        
            console.log(result);

        })
        .catch((err) => {
            console.log(err);
        });    
    });
    
    console.log( countries_);
   res.status(201).json({message: "departments are created successfully"});
}

getDepartmentById = (req, res) => {
    const departmentId = req.params.departmentId;

    departmentModel.findById(departmentId).then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

deleteDepartment = (req, res) => {
    const departmentId = req.params.departmentId;

    departmentModel.findByIdAndDelete(departmentId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

updateDepartment = (req, res) => {
    const departmentId = req.query.departmentId;
    const contactInfo = req.query.contactInfo;

    departmentModel.findByIdAndUpdate(departmentId, {
        contactEmail: contactInfo,

    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}


getAllDepartments = async (req, res) => {
   
   res.send(await departmentModel.find());
}


module.exports = {getAllDepartments, addDepartment, deleteDepartment,  getDepartmentById, updateDepartment, addMultipleDepartments};
