const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Student = require('../../models/Student');


// @route    GET api/students
// @desc     Get students
// @access   Public
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('subjects', ['subjectName']);
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/students
// @desc     add student
// @access   Public 
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'phone',
            'Please enter a phone with 11 digits'
        ).isLength({ min: 9 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, dateOfBirth } = req.body;

        try {
            let student = await Student.findOne({ email });

            if (student) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Student already exists' }] });
            }

            student = new Student({
                name,
                email,
                phone,
                dateOfBirth
            });

            await student.save();
            res.json(student);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    PUT api/students/:id
// @desc     Edit Student Profile
// @access   Public
router.put(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'phone',
            'Please enter a phone with 11 digits'
        ).isLength({ min: 9 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, phone, email, dateOfBirth, subjects, id } = req.body;

        let subjectId = [], profileFields = {};
        if (subjects) {
            subjects.forEach((subject) => {
                subjectId.push(subject._id);
            })
        }
        profileFields.name = name;
        profileFields.phone = phone;
        profileFields.email = email;
        profileFields.dateOfBirth = dateOfBirth;
        profileFields.subjects = subjectId;
        try {
            let student = await Student.findOneAndUpdate(
                { _id: id },
                { $set: profileFields },
                { new: true, upsert: true }
            );
            res.json(student);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    DELETE api/student
// @desc     Delete student
// @access   Public
router.delete('/:id', async (req, res) => {
    try {
        await Student.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Student deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});





module.exports = router;
