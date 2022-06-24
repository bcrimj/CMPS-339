import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Basenav from './Components/Navbar';
import Alldata from './screens/Alldata';
import Userscreen from './screens/Userscreen';
import logo from './images/lion.png';

function App() {
	return (
		<div>
			<div>
			<img className="Lion" src={logo}/>
			</div>
		<Basenav />
		<Routes>
			<Route path="/" element={<Alldata/>}/>
			<Route path="User" element={<Userscreen/>}/>
		</Routes>
		</div>
	)
	

	
}

export default App;
