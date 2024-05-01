import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { FC, useEffect, useState } from 'react';

import { Column } from '../types';
import { TaskCard } from '../components/TaskCard/TaskCard';
import { UserTask } from '@stud-log/news-types/models';
import { UserTaskStatus } from '@stud-log/news-types/enums';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './ScrumTable.module.scss';
import postService from 'services/post.service';

interface ScrumTableProps {
  className?: string;
  tasks: UserTask[];
}

export const ScrumTable: FC<ScrumTableProps> = ({ className, tasks }) => {
  const initialColumns: { [key: string]: Column } = {
    [UserTaskStatus.inProgress]: { id: 'inProgress', title: 'В процессе', taskIds: [] },
    [UserTaskStatus.feedback]: { id: 'feedback', title: 'На проверке', taskIds: [] },
    [UserTaskStatus.passed]: { id: 'passed', title: 'Сдано', taskIds: [] }
  };
  
  const [ columns, setColumns ] = useState(initialColumns);

  useEffect(() => {
    const populatedColumns = tasks.reduce((acc, task) => {
      const { status, id } = task;
      if (acc[status]) {
        acc[status].taskIds.push(id.toString());
      }
      return acc;
    }, { ...initialColumns });
      
    setColumns(populatedColumns);

  }, [ tasks ]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or if the draggable is dropped in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    // Remove the task from the source column
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);

    // Add the task to the destination column
    const endTaskIds = Array.from(endColumn.taskIds);
    endTaskIds.splice(destination.index, 0, draggableId);

    // Update the state with the new task orders
    const updatedColumns = {
      ...columns,
      [startColumn.id]: { ...startColumn, taskIds: startTaskIds },
      [endColumn.id]: { ...endColumn, taskIds: endTaskIds }
    };

    // Set the state with the updated column orders
    setColumns(updatedColumns);

    // Update server status
    const draggableTask = tasks.find(i => i.id == Number(draggableId))!;
    const homeworkTask = draggableTask.record?.homework ? draggableTask : null;
    const customTask = draggableTask.title ? draggableTask : null;

    if(homeworkTask) {
      postService.changeHomeworkStatus(homeworkTask.record!.id, destination.droppableId as keyof typeof UserTaskStatus);
    }
  };

  return (
    <div className={classNames(cls.ScrumTable, {}, [ className ])}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={cls.columnsWrapper}>
          {Object.values(columns).map(column => (
            <div key={column.id} className={cls.columnWrapper}>
              <div className={cls.columnTitle}>{column.title}</div>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cls.column}
        
                  >
                    {column.taskIds.map((taskId, index) => {
                      const task = tasks.find(task => task.id.toString() === taskId);
                      if(!task) return null;
                      return (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided) => (
                            <TaskCard task={task} provided={provided} />
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};