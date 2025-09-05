import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import API from '../api/auth';

const columnsOrder = ['todo', 'in-progress', 'done'];

export default function Board({ boardId }){
  const [tasks, setTasks] = useState([]);

  useEffect(() => { if (!boardId) return; fetchTasks(); }, [boardId]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(`/api/tasks/board/${boardId}`);
      setTasks(data);
    } catch (err) { console.error(err); }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const taskId = result.draggableId;
    const destStatus = result.destination.droppableId;

    // optimistic update
    const moved = tasks.find(t => String(t._id) === String(taskId));
    if (!moved) return;
    moved.status = destStatus;

    // send patch
    try {
      await API.patch(`/api/tasks/${taskId}`, { status: destStatus, order: destIndex });
      fetchTasks();
    } catch (err) { console.error(err); }
  };

  const columnTasks = (status) => tasks.filter(t => t.status === status).sort((a,b)=> (a.order||0)-(b.order||0));

  if(!boardId) return <div>Select a board</div>;

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {columnsOrder.map(col => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ background: '#f1f1f1', padding: 8, width: 280, minHeight: 400 }}>
                <h4>{col}</h4>
                {columnTasks(col).map((task, idx) => (
                  <Draggable key={task._id} draggableId={String(task._id)} index={idx}>
                    {(prov) => (
                      <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} style={{ padding: 12, marginBottom: 8, background: 'white', borderRadius: 6, ...prov.draggableProps.style }}>
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
