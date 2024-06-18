import { useDispatch, useSelector } from 'react-redux';
import ExpenseForm from '../../components/expense/ExpenseForm';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getExpenseDetails,
  updateExpense,
} from '../../redux/slice/expenseSlice';
import { useEffect } from 'react';

const EditExpense = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getExpenseDetails({ id }));
  }, []);

  const { isLoading } = useSelector((state) => state['expense']);

  const handleupdateExpense = async (data) => {
    const response = await dispatch(updateExpense({ id, ...data }));
    if (response.meta.requestStatus === 'fulfilled') {
      navigate('/expense', { replace: true });
    }
  };
  return (
    <div className='w-screen h-screen flex items-center justify-center overflow-x-none'>
      {!isLoading && (
        <ExpenseForm
          onSubmit={handleupdateExpense}
          functionality={'edit'}
        ></ExpenseForm>
      )}
    </div>
  );
};

export default EditExpense;
