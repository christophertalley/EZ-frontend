import React, {useState, useEffect} from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { useParams } from 'react-router-dom';
import { api } from '../config';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Field from './Field';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme)=>({
    root: {
        display:"flex",
        justifyContent: "center",
        marginTop: "20px"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "50vw",
        minHeight: "300px",
        backgroundColor: "beige",
        borderRadius: "15px",
        padding: "10px"
    },
    fieldsContainer: {
        display: "flex",
        flexDirection: "column",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '70ch',
            border: "2px solid grey",
            borderRadius: "5px",
            padding: "5px",
            margin: "15px",
            backgroundColor: "#e3f2fd"
        },
        '& label.Mui-focused': {
            color: '#90caf9',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#90caf9',
        },
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    submitButton: {
        display: "flex",
        justifyContent: "center",
        '& .MuiButton-root': {
            color: "#90caf9",
            backgroundColor: "grey",
            opacity: 0.6
        },
        '& .MuiButton-root:hover': {
            opacity: 1.0
        },
        paddingTop: "20px",
        paddingBottom: "20px"
    }

}))

export default function Form(){
    const classes = useStyles();
    const { formId } = useParams();
    const { loading } = useAuth0;

    const [form, setForm] = useState(null);
    const [fields, setFields] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [fieldValue, setFieldValue ] = useState(null);
    const [formResponses, setFormResponses] = useState([]);
    const [formResponse, setFormResponse] = useState({});

    useEffect(()=> {
        const loadForm = async () => {
            const res = await fetch(`${api}/forms/${formId}`);
            const result = await res.json();
            const formRes  = result.form;

            setForm(formRes);
            setFetched(true);
        }

        loadForm();
    },[fetched])

    useEffect(()=>{
        const fieldSetter = async () => {
                const dataFields = [];
                if (form !== null) {
                    for (const field in form.formData) {
                        dataFields.push({ ...form.formData[field] })
                    }
                    setFields(dataFields);
                    setFormResponse({
                        title: form.title,
                        desc: form.desc,
                        responses: []
                    })
                }
        }
        fieldSetter();

    }, [form]);

    useEffect(()=>{
        const buildResponse = async ()=> {
            if (fieldValue) {
                console.log(fieldValue);
                // const responses = [...formResponses, fieldValue]
                // setFormResponses(responses);
            }
            console.log(formResponses);

        }
        buildResponse();
    },[fieldValue])

    const handleValue = async ( e ) => {
        console.log(e.target.id);

    }


    const handleSubmit = async( e ) => {
        e.preventDefault();
    }
    if (fieldValue) {
        console.log(fieldValue);

    }

    if (!fetched) {
        return (

            <div>
                Loading..
            </div>
        )
    } else {
        return (
            <>
            {!loading && (
            <div className={classes.root}>
                <Paper className={classes.container} elevation={3}>
                    <div style={{padding: "10px"}}>
                        <Typography variant="h3">
                            {form.title}
                        </Typography>
                    </div>
                    <div style={{ padding: "10px" }}>
                        <Typography variant="h5">
                            {form.desc}
                        </Typography>
                    </div>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <div className={classes.fieldsContainer} >
                        {fields.map((field)=> {
                            const props = { field: field, label: field.label, disabled: false, setFieldValue: setFieldValue }
                                if (field.options.length > 0) {
                                    return <Field id={field.id} key={field.id} props={props} required={true}/>;
                                } else {
                                    return <Field id={field.id} key={field.id} props={props} required={false} />;
                                }
                            })}
                        </div>
                        <div className={classes.submitButton}>
                            <Button>
                                Submit Form
                            </Button>
                        </div>
                    </form>
                </Paper>
            </div>
            )}
            </>
        )
    }
}
