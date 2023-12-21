import React , { useCallback } from 'react';
import  {  Handle,  Position,} from 'reactflow'; 
import 'reactflow/dist/style.css';
  
export default function Textinput() {

  const onChange = useCallback((e)=>(
        console.log(e.target.value)
        )
     );

  return (
    <>
        <Handle  type='target'  positon ={Position.Top}/>
        <div >
            <h4>VERIFY YOUR NAME</h4>
            <input type="text" name="" id="textA" onchange={onChange} style={{ height: '2em' , fontSize: '20px', padding:'2px' ,fontWeight: 'bold', background:'yellowgreen'}}/>
        </div>
        <Handle type='source' position={Position.Bottom} />
   </>
  );
}