import React, { useEffect, useRef, useState } from "react";
import './Company.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { json } from "react-router-dom";

function New() {
    const [cname, setCName] = useState("");
    const [cnameError, setCNameError] = useState("");
    const [department, setDepartment] = useState("");
    const [departmentError, setDepartmentError] = useState("");
    const [ageval, setAgeVal] = useState("");
    const [agevalError, setAgeValError] = useState("");
    const [markVal, setMarkVal] = useState("");
    console.log("Susai123", markVal);
    const [markValError, setMarkValError] = useState("");
    const [companyval, setCompanyVal] = useState([]);
    console.log(companyval, "LLL");
    const [deleteVal, setDeleteVal] = useState("");
    const [postVal, setPostVal] = useState([]);
    const [saveUpdateVal, setSaveUpdateVal] = useState("Save");
    const [updatepost, setUpdatepost] = useState([]);
    const [idaval, setIdaval] = useState("");
    const [resulttext, setResultText] = useState()
    const [photoerror, setPhotoError] = useState("")
    console.log("PPP", photoerror);

    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("");

    const [CompanyLogoUpload, setCompanyLogoUpload] = useState('');

    console.log("images", CompanyLogoUpload);

    const fileinput = useRef();


    console.log("AAA", companyval);

    useEffect(()=>{
        console.log("LS");
    })

    const cNameClickVal = (e) => {
        setCName(e.target.value)
        if (e.target.value === "") {
            setCNameError("Please Enter Name")
        }
        else {
            setCNameError("")
        }
    }
    const cDepartment = (e) => {
        setDepartment(e.target.value)
        if (e.target.value === "") {
            setDepartmentError("Please Enter Father's Name")
        }
        else {
            setDepartmentError("")
        }
    }
    const cAgeVal = (e) => {
        setAgeVal(e.target.value)
        if (e.target.value === "") {
            setAgeValError("Please Enter DOB:")
        }
        else {
            setAgeValError("")
        }
    }
    const cMarkVal = (e) => {
        setMarkVal(e.target.value)
        if (e.target.value === "") {
            setMarkValError("Please Enter Class & Section:")
        }
        else {
            setMarkValError("");
        }
    }
    const onChangeInputVal = () => {

        if (fileinput.current.files.length === 0) {
            setPhotoError("Please upload the image");
            setFile("");
            setFilename("");
        }
        else {
            setFile(fileinput.current.files[0]);
            setFilename(fileinput.current.files[0].name);
            setPhotoError("");
        }

    };

    const validform = () => {
        let Valid = true;
        if (cname === "") {
            setCNameError("Please Enter Name");
            Valid = false;
        }
        else {
            setCNameError("");
        }
        if (department === "") {
            setDepartmentError("Please Enter Father's Name");
            Valid = false;
        }
        else {
            setDepartmentError("");
        }
        if (ageval === "") {
            // || isNaN(ageval) || ageval < 1 || ageval > 100
            setAgeValError("Please Enter DOB");
            Valid = false;
        }
        else {
            setAgeValError("");
        }
        if (filename === "") {
            // setResultText(res.data.message)
            setPhotoError("Please upload the image");
            Valid = false;
        }
        else {
            setPhotoError("");
        }

        if (markVal === "") {
            setMarkValError("Please Enter Class & Section:");
            Valid = false;
        }
        else {
            setMarkValError("");
        }
        return Valid;

    }

    const viewDatavalues = () => {
        axios.get("http://localhost:9000/api/get/endrolment")

            .then((res) => {
                setCompanyVal(res.data)
            })
            .catch((err) => {
                console.log("error data", err);
            })
    }



    const saveDataChange = async () => {
        if (saveUpdateVal === "Save") {
            if (validform()) {
                const formdate = new FormData();
                formdate.append('file', file);
                formdate.append('filename', filename);

                var payload = {
                    "studentname": cname,
                    "fathername": department,
                    "photo": "123text",
                    "studentdop": ageval,
                    "classsection": markVal
                }
                try {
                    const res = await axios.post("http://localhost:9000/upload/images", formdate)
                    setResultText(res.data.message);
                    console.log(res, "123response");
                    payload["photo"] = res.data.message;
                    const postiamge = await axios.post("http://localhost:9000/api/insert/endrolment", payload)
                    console.log(postiamge, "imageval");
                    fileinput.current.value = "";
                    alert("Succefully Enrollment")
                    setCName("")
                    setDepartment("")
                    setAgeVal("");
                    setMarkVal("");
                    setFilename("");

                    setTimeout(() => {
                        setResultText("")
                    }, 1000);
                }
                catch (ex) {
                    if (ex.response != undefined) {
                        setResultText(ex.message);
                        console.log("messages", ex.message);

                    }
                    else {
                        setResultText("server error")
                    }
                    setTimeout(() => {
                        setResultText("")
                    }, 4000);
                };
                viewDatavalues();
            }
        }
        else {
            alert("data values")
        }


    }


    const deleteOnclickVal = (id) => {
        if (window.confirm("Are you sure want to delete")) {
            axios.delete(`http://localhost:9000/api/delete/value/${id}`, {

            })
                .then((response) => {
                    setDeleteVal(response.data)
                    viewDatavalues();
                })
                .catch((error) => {
                    console.error("Delete api error", error);
                })
        }
        else {
            console.log("No Data Deleted");
        }

    }

    const onclickUpdateVal = (id, data) => {
        setSaveUpdateVal("Update")
        setCName(data.studentname);
        setDepartment(data.fathername)
        setAgeVal(data.studentdop)
        setMarkVal(data.classsection)
        setIdaval(data.id)
    }

    return (
        <div >
            <div className="heightpic" id='myDivtwo'>
                <div id='myDivtwo'>
                    <div className="header ">
                        <h1 className="schoolname">Sacred Heart Higher Secondary School, Anilady</h1>
                    </div>
                    <div class="navigate">
                        <ul class="d-flex justify-content-between">
                            <li><a className="arefer" href="/company">Admission</a></li>
                            <li><a className="arefer" href="/Susai"> Fees</a></li>
                            <li><a className="arefer" href="/Susai"> Exam</a></li>
                            <li><a className="arefer" href="/Susai"> Staff</a></li>
                            <li><a className="arefer" href="/Susai"> Management</a></li>
                        </ul>
                    </div>

                    <div className="company-container" >

                        <div className="row">
                            <h1 className="txtcomp staddmission">Student Admission Form:-</h1>
                        </div>

                        <div className="container full-container">
                            <div className="row" style={{ marginTop: '50px' }}>
                                <div className="col-4">
                                    <div className="company-formtile">
                                        <span className="student-color">Student Name:</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <input type="text" className='form-control' value={cname} onChange={cNameClickVal}></input>
                                        <p className="error-colour">{cnameError}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="row ">
                                <div className="col-4">
                                    <div className="company-formtile">
                                        <span className="student-color">Father's Name:</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <input type="text" className='form-control' value={department} onChange={cDepartment}></input>
                                    <p className="error-colour"> {departmentError}</p>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-4">
                                    <div className="company-formtile">
                                        <span className="student-color">Student Photo:</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div>
                                        <input type="file" ref={fileinput} accept="image/*" onChange={onChangeInputVal}></input>
                                        {/* <input type="file" className='' accept=".jpeg, .png, .jpg, .pdf" onChange={(e) => onChangeInputVal(e, 'logo1')} /> */}
                                        {/* {base64Data != null && (
                                            <img
                                                style={{ width: '120px', height: '150px', float: 'inline-end', padding: '5px', paddingleft: '5px' }}
                                                src={`data:image;base64,${base64Data}`}
                                            />
                                        )} */}
                                        <p className="error-colour">{photoerror}</p>
                                        <p>{resulttext} </p>

                                    </div>
                                </div>
                            </div>

                            <div className="row dobaligment">
                                <div className="col-4">
                                    <div className="company-formtile">
                                        <span className="student-color">DOB:</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <input type="date" className='form-control' value={ageval} onChange={cAgeVal}></input>
                                    <p className="error-colour"> {agevalError}</p>
                                </div>
                            </div>

                            <div className="row ">
                                <div className="col-4">
                                    <div className="company-formtile">
                                        <span className="student-color">Class & Section:</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <input type="text" className='form-control' value={markVal} onChange={cMarkVal}></input>
                                    <p className="error-colour"> {markValError}</p>
                                </div>
                                {/* <div className="row ">
                                    <div className="col-4">

                                    </div>
                                </div> */}
                            </div>

                        </div>

                        <div className="row btn-colour">
                            <div className="col">
                                <div className="save-btn-cent">
                                    {/* <button className="txtsave" onClick={saveDataChange}>{saveUpdateVal}</button> */}
                                    <Button variant="dark" className="txtsave" onClick={saveDataChange}>{saveUpdateVal} Data</Button>
                                </div>

                            </div>
                        </div>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>
                                        S.No:
                                    </th>
                                    <th>
                                        Student Name:
                                    </th>
                                    <th>
                                        Father's Name:
                                    </th>
                                    <th>
                                        Photo
                                    </th>
                                    <th>
                                        DOB:
                                    </th>
                                    <th>
                                        Class & Section
                                    </th>
                                    <th>
                                        Actions:
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {companyval.map((data, i) => {
                                    return (
                                        <tr>
                                            <td>
                                                {i + 1}
                                            </td>
                                            <td>
                                                {data.studentname}
                                            </td>
                                            <td>
                                                {data.fathername}
                                            </td>
                                            <td>
                                                <img src={`http://localhost:9000/images/${data.photo}`} alt='' style={{ width: '60%', height: '50%' }} />
                                            </td>
                                            <td>
                                                {data.studentdop}
                                            </td>
                                            <td>
                                                {data.classsection}
                                            </td>
                                            <td>

                                                <ButtonGroup aria-label="Basic example">
                                                    <Button variant="secondary" className="mx-1" onClick={() => { deleteOnclickVal(data.id) }}>Delete</Button>
                                                    <Button variant="secondary" onClick={() => onclickUpdateVal(data.id, data)}>Updated</Button>
                                                </ButtonGroup>


                                            </td>
                                        </tr>
                                    )
                                })}


                            </tbody>

                        </Table>
                        <div className="row btn-colour">
                            <div className="col">
                                <div className="save-btn-cent">
                                    <Button variant="primary" className="txtsave" size="lg" onClick={viewDatavalues}>View Data</Button>
                                    {/* <Button variant="danger">Danger</Button> */}
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
export default New;