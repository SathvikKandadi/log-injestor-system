import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Log from './db/models';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 3000

interface LogEntry {
    level: string;
    message: string;
    resourceId: string;
    timestamp: Date;
    traceId: string;
    spanId: string;
    commit: string;
    metadata?: {
        parentResourceId?: string;
    };
}

app.use(bodyParser.json())

app.use(cors())

app.get('/*', (req:Request, res:Response) => {
  res.send("No such route found!");
})

app.post('/ingest' , async (req:Request , res:Response) => {

    const logData:LogEntry = req.body;

    try{
        const log = new Log(logData);
        await log.save();
        res.status(200).send('Log ingested successfully');
    }

    catch (error) {
        console.error('Error processing logs:', error);
        res.status(500).send('Internal Server Error');
    }
} )



app.post('/search' ,async (req:Request , res:Response) => {
    try{
        const filterType = req.body.filterType;
        const filterValue = req.body.filterValue;
        console.log(req.body);
        if(filterType === "metadata")
        {
            const logData:LogEntry[] = await Log.find({"metadata.parentResourceId": filterValue});
            console.log(logData);
            res.json(logData);
        }
        else
        {
            const logData:LogEntry[] = await Log.find({[filterType] : filterValue});
            console.log(logData);
            res.json(logData);
        }
        
    }
    catch (error) {
        console.error('Error searching for  logs:', error);
        res.status(500).send('Internal Server Error');
    }
    
})

app.post('/*' , (req:Request , res:Response) => {
    res.status(404).send("No such route found!");
})



mongoose.connect('mongodb+srv://useyoururlhere.mongodb.net/', { dbName: "logs" });


app.listen(port , () => {
    console.log(`App running on port ${port}`);
})

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// });
