import  { useEffect, useState } from 'react';
import { useForm, } from 'react-hook-form';
import Button from './Buttons';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema/schema';
import type { Task } from '../type/type';
import TaskList from './TaskList';

type formInputs = {
    title: string;
};


const AddTask=() => {
    const { register, handleSubmit, reset, formState: {errors} } = useForm<formInputs>({
        resolver: yupResolver(schema),
    });

    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string) => {
        setTasks([...tasks, { id: Date.now(), title, isCompleted: false }]);
    };
    return (
        <>
            <form onSubmit={handleSubmit((data) => { addTask(data.title); reset(); })} className='flex flex-col max-w-md w-full'>
                <label className='text-gray-700 mb-3 mt-10'>Write your task</label>
                <input {...register('title')} placeholder='Add your task' className='border p-3' />
                {errors.title && (<p className=' text-red-500 text-sm'>{errors.title.message}</p>)}
                <Button type="submit" className=" bg-blue-400 p-2 rounded-lg mt-5 text-white w-full">
                    {'Add'}
                </Button>
            </form>
            <TaskList tasks={tasks} setTasks={setTasks} />
        </>
    );
};

export default AddTask;
