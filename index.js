import express from 'express';

const app = express();

app.use(express.json());

let users = [];

app.post('/create-user', (req, res) => {
    const user = { id: Date.now(), name: req.body.name };
    users.push(user);
    res.status(201).json(user);
});

app.get('/get-all-users', (req, res) => {
    res.json(users);
});

app.get('/get-one-user/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');
    res.status(200).json(user);
})

app.put('/update-user/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');
    user.name = req.body.name;
    res.status(200).json(user);
});

app.delete('/delete-user/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found.');
    const deletedUser = users.splice(userIndex, 1);
    res.status(200).json(deletedUser);
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

