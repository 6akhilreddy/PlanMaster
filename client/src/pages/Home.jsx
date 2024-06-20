import { useDispatch, useSelector } from 'react-redux';
import CategoryGraph from '../components/expense/CategoryGraph';
import {
  getExpensesByCategory,
  getExpensesByMonth,
} from '../redux/slice/expenseSlice';
import { useEffect } from 'react';
import MonthlyGraph from '../components/expense/MonthlyGraph';
import ClipLoader from 'react-spinners/ClipLoader';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, expenseByCategory } = useSelector(
    (state) => state['expense']
  );
  useEffect(() => {
    dispatch(getExpensesByCategory());
    dispatch(getExpensesByMonth());
  }, []);
  return (
    <div className='flex flex-col md:flex-row h-screen w-screen p-3 items-center justify-center'>
      {isLoading ? (
        <ClipLoader size={50} color='#000' />
      ) : (
        <>
          {Object.keys(expenseByCategory).length > 0 ? (
            <>
              <div className='flex-auto'>
                <CategoryGraph></CategoryGraph>
              </div>
              <div className='flex-auto'>
                <MonthlyGraph></MonthlyGraph>
              </div>
            </>
          ) : (
            <p className='flex min-h-[30rem] justify-center items-center text-xl mx-auto w-full font-semibold md:text-2xl'>
              You haven't added any expenses
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
