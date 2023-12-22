import React , { useCallback, useRef , useState} from 'react';
import ReactFlow, {
  ReactFlowProvider,
//   MiniMap,
  Controls,
  Panel,
  NodeToolbar ,
  Background,
//   Handle,
//   Position,
  useNodesState,
  useEdgesState,
  addEdge,
//   NodeRemoveChange,
//   EdgeRemoveChange
} from 'reactflow';

import 'reactflow/dist/style.css';
import Textinput from './textinput';
import Sidebar from './sidebar';
import Basictextinput from './basictexinput';

 
const initialNodes = [
  { id: '1', position: { x: 0, y: 50 }, data: { label: <h2>Start Here</h2> } },
  { id: '2', position: { x: 300, y: 200 }, data: { label: <h4>Process A</h4> } },
  { id: '3', position: { x: 0, y: 300 }, data: { label: <h4>Process B</h4> } },
  { id: '4', position: { x: 0, y: 600 }, data: { label: <h4>STOP</h4> } },
  { id: '6', position: { x: 560, y: 600 }, data: { label: <h4>AUTHORISATION SUCCESSFUL</h4> } },
  { id: '5', 
  position: { x: 500, y: 350 },
  type:'textUpdater',
 },
//  { id: '7', 
//   position: { x: 500, y: 350 },
//   type:'newText',
//  },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e1-4', source: '2', target: '4' },
    { id: 'e1-5', source: '3', target: '4' },
    { id: 'e1-6', source: '5', target: '6' },
];

const nodeTypes = {textUpdater:Textinput, newText:Basictextinput};
export default function Firstflow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // THIS IS ANOTHER WAY TO IMPLEMENT A CSTOM INPUT NODE BUT CAN CAUSE PERFORMANCE ISSUES , added better way above component
//   const nodeTypes = useMemo(()=> ({textUpdater:Textinput}), []);

  const onConnect = useCallback(
   (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],

  );


  let id = 0;


    const getId = useCallback(() => {
      return `dndnode_${id++}`;
    }, [id]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

   
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, getId],
  );

  return (
     <div className="dndflow">
     < ReactFlowProvider>
 
      <div ref={reactFlowWrapper} style={{ width: '70vw', height: '90vh', margin:" 2em" }}>
            <ReactFlow
              nodes={nodes} 
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              
              <Controls />
              <Panel />    
              <NodeToolbar />
              <Background variant="dots" gap={4} size={1} />
            
            </ReactFlow>
        </div>
        <Sidebar/>
        </ReactFlowProvider>
    </div>
  );
};