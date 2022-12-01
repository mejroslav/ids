import express, { json, urlencoded } from 'express';
import path from 'path';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false}));

app.get('/', (req, res) => {
    res.send("<p>Miroslav Burýšek.</p>");
});

app.post('/contact', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send("Name is required.");
    }

    res.status(201).send("Thank you ${req.body.name}");
});


app.listen(5000, () => console.log("Server started on 5000."));