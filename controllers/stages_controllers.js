// dependencies
const express = require('express');
const router = express.Router();
const Stage = require('../models/Stage');

// Index route
router.get('/', async (req, res) => {
    try {
        const stages = await Stage.findAll();
        res.json(stages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Show route
router.get('/:id', async (req, res) => {
    try {
        const stage = await Stage.findByPk(req.params.id);
        if (stage) {
            res.json(stage);
        } else {
            res.status(404).json({ message: 'Stage not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create route
router.post('/', async (req, res) => {
    try {
        const stage = await Stage.create(req.body);
        res.status(201).json(stage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update route
router.put('/:id', async (req, res) => {
    try {
        const stage = await Stage.findByPk(req.params.id);
        if (stage) {
            await stage.update(req.body);
            res.json(stage);
        } else {
            res.status(404).json({ message: 'Stage not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete route
router.delete('/:id', async (req, res) => {
    try {
        const stage = await Stage.findByPk(req.params.id);
        if (stage) {
            await stage.destroy();
            res.json({ message: 'Stage deleted successfully' });
        } else {
            res.status(404).json({ message: 'Stage not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
