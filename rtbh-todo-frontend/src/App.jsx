import { useState } from 'react';
import { NewTaskForm, TaskList } from './components/index';

function App() {
    const [hasNewTask, setHasNewTask] = useState(false);
    return (
        <>
            <header className='h-[50px] bg-[#0d0d0d] flex flex-row justify-center content-center'>
                <p className='text-white text-[2.4rem] m-auto'>RTBH TODO APP</p>
            </header>
            <main className='my-[2.4rem] mx-[12.8rem] '>
                <section
                    id='tasks'
                    className='bg-white sm:w-screen lg:w-fit m-auto rounded-2xl pt-[.8rem] pb-[3.2rem] px-[2.4rem] flex flex-col'>
                    <h2 className='text-center font-semibold my-[2.4rem] text-[3.2rem]'>
                        Tasks
                    </h2>
                    <NewTaskForm
                        hasNewTask={hasNewTask}
                        setHasNewTask={setHasNewTask}
                    />
                    <TaskList hasNewTask={hasNewTask} />
                </section>
            </main>
        </>
    );
}

export default App;
