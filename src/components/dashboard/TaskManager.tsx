
import React, { useState } from 'react';
import { CheckSquare, CheckCircle, Circle, Plus, X } from 'lucide-react';

// Task status types
type TaskStatus = 'todo' | 'in-progress' | 'completed';

// Task interface
interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate?: string;
}

const TaskManager = () => {
  // Sample tasks - in a real app, this would come from a database
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Submit monthly expenses', status: 'todo', dueDate: '2025-05-10' },
    { id: '2', title: 'Review draft tax report', status: 'in-progress', dueDate: '2025-05-15' },
    { id: '3', title: 'Sign annual report documents', status: 'completed', dueDate: '2025-04-28' },
  ]);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  
  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  
  // Add new task
  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        status: 'todo',
        dueDate: newTaskDueDate || undefined
      };
      
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDueDate('');
    }
  };
  
  // Update task status
  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };
  
  // Delete task
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  // Task card component
  const TaskCard = ({ task }: { task: Task }) => (
    <div className="bg-[#1A1A1A] border border-[#333] rounded-md p-4 mb-3">
      <div className="flex justify-between">
        <div className="flex items-start gap-3">
          <button 
            onClick={() => {
              if (task.status === 'todo') updateTaskStatus(task.id, 'in-progress');
              else if (task.status === 'in-progress') updateTaskStatus(task.id, 'completed');
              else updateTaskStatus(task.id, 'todo');
            }}
            className="mt-1"
          >
            {task.status === 'completed' ? (
              <CheckCircle size={18} className="text-green-500" />
            ) : task.status === 'in-progress' ? (
              <Circle size={18} className="text-yellow-500" />
            ) : (
              <Circle size={18} className="text-white" />
            )}
          </button>
          
          <div>
            <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-[#777]' : ''}`}>
              {task.title}
            </h4>
            {task.dueDate && (
              <p className="text-xs text-[#999] mt-1">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        
        <button 
          onClick={() => deleteTask(task.id)} 
          className="text-[#777] hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Tasks</h2>
      </div>
      
      {/* Add new task form */}
      <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Create New Task</h3>
        <div className="flex flex-col gap-4">
          <input 
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Task title"
            className="bg-[#1A1A1A] border border-[#333] rounded-md p-3 text-white w-full"
          />
          
          <input 
            type="date"
            value={newTaskDueDate}
            onChange={(e) => setNewTaskDueDate(e.target.value)}
            className="bg-[#1A1A1A] border border-[#333] rounded-md p-3 text-white w-full"
          />
          
          <button 
            onClick={handleAddTask}
            className="flex items-center justify-center gap-2 bg-white text-black py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Plus size={18} /> Add Task
          </button>
        </div>
      </div>
      
      {/* Task boards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To-do column */}
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">To Do</h3>
            <span className="bg-[#333] text-white text-xs px-2 py-1 rounded-full">
              {todoTasks.length}
            </span>
          </div>
          
          {todoTasks.length > 0 ? (
            todoTasks.map(task => <TaskCard key={task.id} task={task} />)
          ) : (
            <p className="text-[#777] text-sm">No tasks yet</p>
          )}
        </div>
        
        {/* In progress column */}
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">In Progress</h3>
            <span className="bg-[#333] text-white text-xs px-2 py-1 rounded-full">
              {inProgressTasks.length}
            </span>
          </div>
          
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map(task => <TaskCard key={task.id} task={task} />)
          ) : (
            <p className="text-[#777] text-sm">No tasks in progress</p>
          )}
        </div>
        
        {/* Completed column */}
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Completed</h3>
            <span className="bg-[#333] text-white text-xs px-2 py-1 rounded-full">
              {completedTasks.length}
            </span>
          </div>
          
          {completedTasks.length > 0 ? (
            completedTasks.map(task => <TaskCard key={task.id} task={task} />)
          ) : (
            <p className="text-[#777] text-sm">No completed tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
