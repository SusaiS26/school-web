import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatevalu,setStatevaluetwo } from "./appreduxvalues/reduxmaster";




function Openscreen() {
    const Dispatch = useDispatch();
    const usestateval = useSelector((state) => state.namevalue.Statevalue)
    const usetestval2=useSelector((state)=>state.namevalue.Statevaluetwo) 

    const onchangeval = (e) => {
        Dispatch(setStatevalu(e.target.value))
    }

    const onchangetestval = (e) => {
        Dispatch(setStatevaluetwo(e.target.value))

    }

    return (
        <div>
            <h1>Test</h1>
            <input type="text" value={usestateval} onChange={onchangeval}></input>
            <h2>{usestateval}</h2>
            <h1>Test Value2</h1>
            <input type="text" value={usetestval2} onChange={onchangetestval}></input>
            <h2>{usetestval2}</h2>
        </div>
    )
}
export default Openscreen;