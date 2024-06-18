import { useNavigate } from 'react-router-dom';
import { deleteExpense } from '../../redux/slice/expenseSlice';
import { MdDelete, MdEdit } from 'react-icons/md';
const ExpenseTable = ({ filteredExpenses }) => {
  const navigate = useNavigate();
  const calculateTotal = (expenses) => {
    const total = expenses?.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );
    return total;
  };
  return (
    <div className='mt-4'>
      {filteredExpenses.length > 0 && (
        <h2 className='text-xl mx-auto mb-2 text-center w-fit sm:w-full font-semibold md:text-2xl md:mb-4'>
          Total Expenditure : ₹{calculateTotal(filteredExpenses)}{' '}
        </h2>
      )}
      {filteredExpenses.length > 0 ? (
        <div className='overflow-x-auto w-full flex justify-center items-center shadow-md sm:rounded-lg'>
          <div className='w-full flex flex-col md:pt-2 '>
            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
              <thead className='bg-gray-200 text-left dark:bg-gray-700'>
                <tr>
                  <th
                    scope='col'
                    className='py-3 px-6 text-base md:text-lg font-semibold tracking-wider text-gray-800 dark:text-gray-400'
                  >
                    Title
                  </th>
                  <th
                    scope='col'
                    className='py-3 px-6 text-base md:text-lg font-semibold tracking-wider text-gray-800 dark:text-gray-400'
                  >
                    Amount
                  </th>
                  <th
                    scope='col'
                    className='py-3 px-6 text-base md:text-lg font-semibold tracking-wider text-gray-800 dark:text-gray-400'
                  >
                    Date
                  </th>
                  <th
                    scope='col'
                    className='py-3 px-6 text-base md:text-lg font-semibold tracking-wider text-gray-800 dark:text-gray-400'
                  >
                    Time
                  </th>
                  <th
                    scope='col'
                    className='py-3 px-6 text-base md:text-lg font-semibold tracking-wider text-gray-800 dark:text-gray-400'
                  >
                    Category
                  </th>
                  <th
                    scope='col'
                    className='py-3 px-6 text-base md:text-lg font-semibold tracking-wider text-gray-800 dark:text-gray-400'
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                {filteredExpenses?.map((expense) => {
                  return (
                    <tr key={expense._id}>
                      <td className='py-4 px-6 text-sm sm:text-base font-medium text-gray-600 whitespace-nowrap dark:text-white'>
                        {expense?.title}
                      </td>
                      <td className='py-4 px-6 text-sm sm:text-base font-medium text-gray-600 whitespace-nowrap dark:text-white'>
                        ₹{expense?.amount}
                      </td>
                      <td className='py-4 px-6 text-sm sm:text-base font-medium text-gray-600 whitespace-nowrap dark:text-white'>
                        {expense?.date}
                      </td>
                      <td className='py-4 px-6 text-sm sm:text-base font-medium text-gray-600 whitespace-nowrap dark:text-white'>
                        {expense?.time}
                      </td>
                      <td className='py-4 px-6 text-sm sm:text-base font-medium text-gray-600 whitespace-nowrap dark:text-white'>
                        {expense?.category}
                      </td>
                      <td className='flex items-center gap-x-6 py-4 px-6 text-base font-medium '>
                        <MdEdit
                          onClick={() => {
                            navigate(`/expense/update/${expense._id}`, {
                              replace: true,
                            });
                          }}
                          className='text-2xl text-blue-500 cursor-pointer hover:text-blue-900'
                        />
                        <MdDelete
                          onClick={() => dispatch(deleteExpense(expense._id))}
                          className='text-2xl text-red-500 cursor-pointer hover:text-red-700'
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className=' mt-5 text-red-500 text-xl mx-auto text-center w-full font-semibold md:text-2xl'>
          {' '}
          No Expenses Found
        </p>
      )}
    </div>
  );
};

export default ExpenseTable;
