const Task = require('../models/TaskModel');

exports.createTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    const task = new Task({ userId: req.user.userId, title, description, status, dueDate });

    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;

    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { title, description, status, dueDate },
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
