import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Basenav from './Components/Navbar';
import Alldata from './screens/Alldata';
import Userscreen from './screens/Userscreen';
import Products from './screens/Products';
import logo from './images/lion.png';

function App() {
	return (
		<div>
			<div>
			<img className="Lion" alt="A Lion" src={logo}/>
			</div>
		<Basenav />
		<Routes>
			<Route path="/" element={<Alldata/>}/>
			<Route path="User" element={<Userscreen/>}/>
			<Route path="Products" element={<Products/>}/>
		</Routes>
		</div>
	)
	

	
}

export default App;
