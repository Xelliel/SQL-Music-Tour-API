// dependencies
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Index route
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll({ order: [['date', 'ASC']] });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Show route
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create route
router.post('/', async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update route
router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (event) {
            await event.update(req.body);
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete route
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (event) {
            await event.destroy();
            res.json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
