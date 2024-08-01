import express from 'express';
import { getapi, postinsert } from './main.js';
import cors from 'cors';


const app = express()
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get("/api/get/endrolment", async (req, res) => {
    let result = await getapi();
    res.send(result);
});

app.post("/api/post/contact", async (req, res) => {
    const { firstName,lastName,phonenumber,email_id } = req.body;
    let insertval = await postinsert(firstName,lastName,phonenumber,email_id);
    res.status(201).send(insertval);
});

app.listen(4000, () => {
    console.log("run 3000 in server");
})

app.use(4000, (err, req, res, next) => {
    res.status(3000).send("something went wrong")
})
