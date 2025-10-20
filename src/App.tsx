
import AddTask from './components/AddTask';

function App() {

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-10">To-Do App</h1>

      <AddTask />
    </div>
  );
}

export default App;
