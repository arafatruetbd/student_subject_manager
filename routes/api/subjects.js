const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Subject = require('../../models/Subject');
const Student = require('../../models/Student');


// @route    GET api/students
// @desc     Get students
// @access   Public
router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/subjects
// @desc     add subjects
// @access   Public 
router.post(
    '/',
    [
        check('subjectName', 'Subject is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { subjectName } = req.body;
        console.log(req.body);

        try {
            subject = new Subject({
                subjectName
            });
            await subject.save();
            res.json(subject);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    POST api/subjects
// @desc     assign subject
// @access   Public 
router.post(
    '/assign-subject',
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { studentName, subjectId } = req.body;
        console.log(req.body);

        try {
            const student = await Student.findOne({ name: studentName });
            student.subjects.push(subjectId);
            await student.save();
            res.json(student);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    DELETE api/subject
// @desc     Delete subject
// @access   Public
router.delete('/:id', async (req, res) => {
    try {
        await Subject.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Subject deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});






module.exports = router;
