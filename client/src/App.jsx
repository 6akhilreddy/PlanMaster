import './App.css';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import ProtectedLayout from './components/ProtectedLayout';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import AddExpense from './pages/expense/AddExpense';
import AllExpenses from './pages/expense/AllExpenses';
import EditExpense from './pages/expense/EditExpense';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path='/expense' element={<AllExpenses />} />
            <Route path='/expense/new' element={<AddExpense />} />
            <Route path='/expense/update/:id' element={<EditExpense />} />
          </Route>
        </Routes>
        <Toaster position='top-right' />
      </Router>
    </>
  );
}

export default App;
