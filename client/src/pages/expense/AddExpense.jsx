import { useDispatch } from 'react-redux';
import ExpenseForm from '../../components/expense/ExpenseForm';
import { useNavigate } from 'react-router-dom';
import { addExpense } from '../../redux/slice/expenseSlice';

const AddExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddExpense = async (data) => {
    const response = await dispatch(addExpense(data));
    if (response.meta.requestStatus === 'fulfilled') {
      navigate('/expense', { replace: true });
    }
  };
  return (
    <div className='w-screen h-screen flex items-center justify-center overflow-x-none'>
      <ExpenseForm
        onSubmit={handleAddExpense}
        functionality={'add'}
      ></ExpenseForm>
    </div>
  );
};

export default AddExpense;
