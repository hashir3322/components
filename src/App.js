import { useState } from 'react';
import './App.css';
import Accordion from './components/Accordion/Accordion';
import AnimatedTab from './components/AnimatedTabs';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} />
      <div className='ml-[235px] p-5'>
        <button className='border-[1px] p-2 border-black' onClick={() => setIsSidebarOpen((prev) => !prev)}> 
          toggle sidebar
        </button>
        <Accordion />
        <AnimatedTab />
      </div>
    </>
  );
}

export default App;
