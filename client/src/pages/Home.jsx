import { useDispatch } from 'react-redux';
import CategoryGraph from '../components/expense/CategoryGraph';
import {
  getExpensesByCategory,
  getExpensesByMonth,
} from '../redux/slice/expenseSlice';
import { useEffect } from 'react';
import MonthlyGraph from '../components/expense/MonthlyGraph';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExpensesByCategory());
    dispatch(getExpensesByMonth());
  }, []);
  return (
    <div className='flex flex-col md:flex-row h-screen w-screen p-3 items-center'>
      <div className='flex-auto'>
        <CategoryGraph></CategoryGraph>
      </div>
      <div className='flex-auto'>
        <MonthlyGraph></MonthlyGraph>
      </div>
    </div>
  );
};

export default Home;
