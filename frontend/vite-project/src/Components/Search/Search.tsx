import './Search.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import  {useState} from 'react';
import  Typography  from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
//import Log from '../Log/Log';

interface Logtype {
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


function Search()
{
    const [filterType,setFilterType] = useState('');
    const [filterValue,setFilterValue] = useState('');
    const [label,setLabel] = useState("");
    const [logs , setLogs] = useState<Logtype[]>([]);

    const cardStyle = {
        width:'30%',
        minHeight:'50%',
        margin:'2%'
    };

    const selectStyle = {
        width:"90%",
        marginLeft:"5%",
        
    };

    const textFieldStyle = {
        width:"90%",
        margin:"5%",
    }

    const buttonStyle = {
        width:"25%",
        marginLeft:"35%",
        marginBottom:"2%",
        marginTop:"2%"
    }

    const logStyle = {
        margin:"1%",
        minHeight:"10%",
        width:"17%",
    }

  

    return(
        <div className='searchMain'>
        <Card style={cardStyle}>
        <InputLabel id="filter-type-label"><Typography>Filter Type</Typography></InputLabel>
        <br/>
        <Select 
        labelId="filter-type-label"
        id="filter-type-select"
        value={filterType}
        label="Filter Type"
        onChange={handleChange}
        style={selectStyle}
        >
            <MenuItem value="level">level</MenuItem>
            <MenuItem value="message">message</MenuItem>
            <MenuItem value="resourceId">resourceId</MenuItem>
            <MenuItem value="timestamp">timestamp</MenuItem>
            <MenuItem value="traceId">traceId</MenuItem>
            <MenuItem value="spanId">spanId</MenuItem>
            <MenuItem value="commitId">commitId</MenuItem>
            <MenuItem value="metadata">metadata</MenuItem>
        </Select>
        <br/>
        <TextField id="outlined-basic" onChange={handleText}  label={`${label}`} variant="outlined" style={textFieldStyle}/>
        <Button style={buttonStyle} variant="contained" onClick={search}>Search</Button>
        </Card>
        {
            logs.map((log) => (
                <Card style={logStyle}>
                    <ul style={{ listStyleType: 'none' }}>
                        <li>Level: {log.level}</li>
                        <li>Message: {log.message}</li>
                        <li>ResourceId: {log.resourceId}</li>
                        <li>TraceId: {log.traceId}</li>
                        <li>SpanId: {log.spanId}</li>
                        <li>Commit: {log.commit}</li>
                        <li>ParentResourceId: {log.metadata?.parentResourceId}</li>
                    </ul>
                </Card>
            ))
        }
        </div>
    )

    function handleChange(event:any)
    {
        setFilterType(event.target.value);
        if(event.target.value === "metadata")
            setLabel("Enter parentResourceId");
            //setFilterValue(`Enter parentResourceId`);
        else
            setLabel(`Enter ${event.target.value}`);
            //setFilterValue(`Enter ${event.target.value}`);
    }

    function handleText(event:any)
    {
        setFilterValue(event.target.value);
    }

    async function search()
    {
        if(filterType === "" || filterValue === "")
        {
            alert("Required fields are empty");
            return;
        }

        const filter = {
            filterType:filterType,
            filterValue:filterValue
        };

        try{
            const resp = await axios.post("http://localhost:3000/search" , filter);
            setLogs(resp.data);
            // const logs:LogEntry[] = resp.data;
            // // return (
            //     logs.map((log:LogEntry) => (
            //         <div>
            //             <div>{log.level}</div>
            //             <div>{log.message}</div>
            //             <div>{log.resourceId}</div>
            //             {/* <div><p>{timestamp}</p></div> */}
            //             <div>{log.traceId}</div>
            //             <div>{log.spanId}</div>
            //             <div>{log.commit}</div>
            //             <div>{log.metadata?.parentResourceId}</div>
            //         </div>
            //     ))
            // // )
            console.log(logs);
        }
        catch (error) {
            console.error('Error searching for  logs:', error);
        }   
        
    }
}

export default Search;