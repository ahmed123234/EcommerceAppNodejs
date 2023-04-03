const departmentController = require('../controllers/department-controller');
const express = require('express');

const router = express.Router();

router.use(express.json());


router.post('/add', (req, res) => departmentController.addDepartment(req, res) );
router.post('/addMany', (req, res) => departmentController.addMultipleDepartments(req, res));
router.get('/:departmentId', (req, res) => departmentController.getDepartmentById(req, res));
router.patch('/:departmentId', (req, res) => departmentController.updateDepartment(req, res));
router.delete('/:departmentId', (req, res) => departmentController.deleteDepartment(req, res));
router.get('/', (req, res) => departmentController.getAllDepartments(req, res));

router.use((req, res) => {
    res.status(404).send("Not Found!");
});


module.exports = router;