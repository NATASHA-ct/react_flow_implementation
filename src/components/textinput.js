import React , { useCallback } from 'react';
import  {  Handle,  Position,} from 'reactflow'; 
import 'reactflow/dist/style.css';
  
export default function Textinput() {

  const onChange = useCallback((e)=>(
        console.log(e.target.value)
        )
     ,[]);

  return (
    <> 
        <Handle  type='target'  positon ={Position.Top}/>
        <div >
           <p>VERIFY YOUR NAME</p>
            <input type="text" name="" id="textA" placeholder='enter your name' onChange={onChange} style={{ height: '2em' , width:'auto', fontSize: '20px', padding:'2px' ,fontWeight: 'bold', background:'yellowgreen'}}/>
        </div>
        <Handle type='source' position={Position.Bottom} />
   </>
  );
}