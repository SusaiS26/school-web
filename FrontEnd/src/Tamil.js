import axios from "axios";
import React, { useRef, useState } from "react";
import { Form } from "react-router-dom";


function Tamil() {

    const [file, setFile] = useState();
    const [filename, setFilename] = useState();
    const [resulttext, setResultText] = useState()
    console.log("34", resulttext);
    const [photo, setphoto] = useState()
    const [cname, setCName] = useState("");
    console.log("111photo", photo);

    const fileinput = useRef();

    const onChangeInputVal = () => {
        setFile(fileinput.current.files[0]);
        setFilename(fileinput.current.files[0].name)
    };

    const cNameClickVal = (e) => {
        setCName(e.target.value)

    }

    const onSubmitValue = async () => {
        const formdate = new FormData();
        formdate.append('file', file);
        formdate.append('filename', filename);

        var payload = {
            "studentname": cname,
            "fathername": "Susai",
            "photo": "text123",
            "studentdop": "2021-10-10",
            "classsection": "X-A"
        }


        try {
            const res = await axios.post("http://localhost:9000/upload/images", formdate)
            setResultText(res.data.message);
            console.log(res, "123response");
            payload["photo"] = res.data.message;
            const postiamge = await axios.post("http://localhost:9000/api/insert/endrolment", payload)
            console.log(postiamge, "imageval");
            fileinput.current.value = "";

            setTimeout(() => {
                setResultText("")
            }, 4000);

        }
        catch (ex) {
            if (ex.response != undefined) {
                setResultText(ex.response.data.message);

            }
            else {
                setResultText("server error")
            }
            setTimeout(() => {
                setResultText("")
            }, 4000);

        }

    };
    // const viewDatavalues = () => {
    //     axios.get("http://localhost:9000/api/get/endrolment")

    //         .then((res) => {
    //             setCompanyVal(res.data)
    //         })
    //         .catch((err) => {
    //             console.log("error data", err);
    //         })
    // }

    return (
        <div>
            <h1>upload Images</h1>
            <input type="file" ref={fileinput} accept="image/*" onChange={onChangeInputVal}></input>
            <button onClick={onSubmitValue}>Submit</button>
            {resulttext ? (<p style={{ color: 'red' }}>{resulttext}</p>) : null}

            <div className="company-formtile">
                <span className="student-color">Student Name:</span>
            </div>
            <div className="col-6">
                <div>
                    <input type="text" className='form-control' value={cname} onChange={cNameClickVal}></input>
                </div>
            </div>

        </div>
    )
}
export default Tamil;