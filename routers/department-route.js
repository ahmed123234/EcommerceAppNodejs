const departmentController = require('../controllers/department-controller');
const express = require('express');

const router = express.Router();

router.use(express.json());


router.post('/add', departmentController.addDepartment);
router.post('/addMany', departmentController.addMultipleDepartments);
router.get('/:productId', departmentController.getDepartmentById);
router.patch('/:productId', departmentController.updateDepartment);
router.delete('/:productId', departmentController.deleteDepartment);
router.get('/', departmentController.getAllDepartments);

router.use((req, res) => {
    res.status(404).send("Not Found!");
});


module.exports = router;