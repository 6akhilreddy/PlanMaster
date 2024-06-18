import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CATEGORIES } from '../../constants/expense';
import { useSelector } from 'react-redux';

const ExpenseForm = ({ onSubmit, functionality }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { expense } = useSelector((state) => state['expense']);
  const isEdit = functionality === 'edit';
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white w-full rounded-lg shadow-xl border-t-2 overflow-hidden mx-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg'
    >
      <div className='w-full p-8 '>
        <h2 className='text-2xl font-semibold text-gray-900 text-center'>
          {!isEdit ? 'New Expense' : 'Edit Expense'}
        </h2>
        <div className='mt-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className='bg-gray-200 text-gray-900 font-medium focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full'
            type='text'
            {...register('title', { required: true })}
            defaultValue={isEdit ? expense?.title : ''}
          />
          {errors.title && (
            <div className='mt-1 text-red-500'>Title field is required</div>
          )}
        </div>
        <div className='mt-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Amount
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            className='bg-gray-200 text-gray-900 font-medium focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full'
            type='number'
            {...register('amount', { required: true, min: 1 })}
            defaultValue={isEdit ? expense?.amount : ''}
          />
          {errors.amount && (
            <div className='mt-1 text-red-500'>
              Amount field is required and more than 1
            </div>
          )}
        </div>
        <div className='mt-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Date
          </label>
          <input
            onChange={(e) => setDate(e.target.value)}
            className='bg-gray-200 text-gray-900 font-medium focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full'
            type='date'
            defaultValue={
              isEdit ? expense?.date : new Date().toISOString().split('T')[0]
            }
            {...register('date', { required: true })}
          />
          {errors.date && (
            <div className='mt-1 text-red-500'>Date field is required</div>
          )}
        </div>
        <div className='mt-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Time
          </label>
          <input
            onChange={(e) => setDate(e.target.value)}
            className='bg-gray-200 text-gray-900 font-medium focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full'
            type='time'
            defaultValue={
              isEdit
                ? expense?.time
                : `${new Date().toLocaleTimeString().slice(0, -3)}`
            }
            {...register('time', { required: true })}
          />
          {errors.time && (
            <div className='mt-1 text-red-500'>Time field is required</div>
          )}
        </div>
        <div className='mt-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Category
          </label>
          <select
            className='bg-gray-200 text-gray-900 font-medium focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full'
            {...register('category', { required: true })}
            defaultValue={isEdit ? expense.category : ''}
          >
            {CATEGORIES.map((value, index) => (
              <option key={index}>{value}</option>
            ))}
          </select>
        </div>
        <div className='flex gap-x-4 mt-8  mx-auto justify-between'>
          <Link to={`/expense`}>
            <button className='text-gray-800 bg-gray-200 border-2 border-black font-bold py-2 px-4 w-fit rounded hover:bg-gray-800 hover:text-white'>
              Cancel
            </button>
          </Link>
          <input
            type='submit'
            className='bg-gray-800 text-white font-bold py-2 px-4 w-fit rounded hover:bg-gray-700'
            value={isEdit ? 'Edit Expense' : 'Add Expense'}
          />
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
