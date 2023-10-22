import React from 'react';
import {Route,Routes} from 'react-router-dom'
import './App.css';
import PostForm from './PostForm';
import NavBar from './NavBar';
import FindQuestion from './FindQuestion';
import Subscriptions from './Subscriptions';
import YourComponent from './YourComponent';
import PricingPlans from './PricingPlans'; 


function App() {
  return (
    <Routes>

    <Route path='/' element ={<NavBar />} />
    <Route path='/postform' element={<PostForm/>}/>
    <Route path='/find-question' element={<FindQuestion/>}/>
    <Route path='/subscriptions' element={<Subscriptions/>}/>
    <Route path = "/PricingPlans" element= {<PricingPlans/>}/>

 


    </Routes>
  );
}

export default App;
