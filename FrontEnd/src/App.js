import logo from './logo.svg';
import './App.css';
import { React,Suspense,lazy} from 'react'
import Home from './Pages/Users/Home';
import NotFound from './Pages/NotFound';
import LazyLoad from './Pages/LazyLoad';
import TutorApplyForm from './Pages/Tutors/TutorApplyForm';

import { BrowserRouter as Router, Switch, Route,Routes } from 'react-router-dom';
const User= lazy(()=>import( './Routes/User'));
const Admin=lazy(()=>import('./Routes/Admin'))
const Tutor=lazy(()=>import('./Routes/Tutor'))


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='user/*' element={<Suspense fallback={<LazyLoad/>}><User/> </Suspense>}/>
        <Route path='tutor/*' element={<Suspense fallback={<LazyLoad/>}><Tutor/> </Suspense>}/>
        <Route path='/' element={<Suspense fallback={<LazyLoad/>}><Home/> </Suspense>}/>
        <Route path='admin/*' element={<Suspense fallback={<LazyLoad/>}><Admin/> </Suspense>}/>
        <Route path='/tutorapply' element={<Suspense fallback={<LazyLoad/>}><TutorApplyForm/> </Suspense>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>

     </Router>
    </div>
  );
}

export default App;
