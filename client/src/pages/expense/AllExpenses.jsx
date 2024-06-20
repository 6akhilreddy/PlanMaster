import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllExpenses,
  getFilteredExpenses,
} from '../../redux/slice/expenseSlice';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import { filterExpenses } from '../../utils/filter';
import { toast } from 'react-hot-toast';
import ExpenseTable from '../../components/expense/ExpenseTable';
import ClipLoader from 'react-spinners/ClipLoader';

const AllExpenses = () => {
  const dispatch = useDispatch();

  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [startDate, setStartDate] = useState(''); //stores start date
  const [endDate, setEndDate] = useState(''); //stores end date
  const [filteredDates, setfilteredDates] = useState({
    start: '',
    end: '',
  }); // stores start and end dates after date filter is applied
  const [query, setQuery] = useState(''); //stores the query for search
  const [isFilter, setIsFilter] = useState(false); // stores the state of  filter active  based on date filtering
  const [filteredData, setFilteredData] = useState([]); // stores filtered data after applying  the date filter
  const [searchedExpenses, setSearchedExpenses] = useState([]); // stores searched data after applying the  search
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(getAllExpenses());
  }, []);
  const { expenses, isLoading } = useSelector((state) => state['expense']);

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery === '') {
      if (isFilter) {
        setFilteredExpenses(filteredData);
      } else {
        setFilteredExpenses(expenses);
      }
    } else {
      let filtered;
      if (isFilter) {
        filtered = filterExpenses(newQuery, filteredData);
      } else {
        filtered = filterExpenses(newQuery, expenses);
      }
      setFilteredExpenses(filtered);
    }
  };

  const handleFilter = async () => {
    if (startDate <= endDate) {
      setfilteredDates({ start: startDate, end: endDate });
      const response = await dispatch(
        getFilteredExpenses({ startDate, endDate })
      );
      if (response.meta.requestStatus === 'fulfilled') {
        const result = response.payload.expenses;
        setIsFilter(true);
        setFilteredData(result);
        if (query !== '') {
          setSearchedExpenses(filterExpenses(query, result));
          setFilteredExpenses(filterExpenses(query, result));
        } else {
          setFilteredExpenses(result);
        }
        setStartDate('');
        setEndDate('');
      }
    } else {
      toast.error('Start Date must not exceed End Date');
    }
  };

  const clearFilters = async () => {
    setIsFilter(false);
    setQuery('');
    setStartDate('');
    setEndDate('');
    setfilteredDates({ start: '', end: '' });
    setFilteredData([]);
    setSearchedExpenses([]);
    setShowFilter(false);
    const response = await dispatch(getAllExpenses());
    setFilteredExpenses(response.payload.expenses);
  };

  return isLoading ? (
    <div className='flex flex-col md:flex-row h-screen w-screen p-3 items-center justify-center'>
      <ClipLoader size={50} color='#000' />
    </div>
  ) : (
    <div className='w-full pt-20 lg:pt-24'>
      <div className='w-full md:max-w-[95%] lg:max-w-[90%] flex justify-between items-center mx-auto px-3 md:px-0 '>
        <h1 className='text-2xl font-medium md:text-2xl'>Your Expenses</h1>
        <Link to={'/expense/new'}>
          <button className='text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg py-2 px-4'>
            Add Expense
          </button>
        </Link>
      </div>
      {expenses.length > 0 ? (
        <div className='w-full md:max-w-[95%] lg:max-w-[90%] px-5 md:px-0 flex flex-col mx-auto'>
          <div className='mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0'>
            <div className=' py-2 md:py-4 w-full sm:w-fit'>
              <input
                onChange={handleSearch}
                type='search'
                value={query}
                placeholder='Search Here'
                className='p-2 bg-white text-black border-2 w-full border-gray-400 focus:outline-none rounded-lg'
              />
            </div>
            {showFilter && (
              <div className='flex flex-col gap-y-2 sm:flex-row sm:gap-x-3 md:gap-x-1 lg:gap-x-3 sm:items-center w-full md:w-fit'>
                <div className='flex items-center gap-1 lg:gap-2'>
                  <input
                    placeholder='startdate'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className='bg-white text-gray-600 font-medium rounded-lg focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 w-full sm:w-fit md:px-2 lg:px-4'
                    type='date'
                  />
                  <span className='font-semibold text-center '>To</span>
                  <input
                    placeholder='enddate'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className='bg-white text-gray-600 font-medium rounded-lg focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 w-full sm:w-fit md:px-2 lg:px-4'
                    type='date'
                  />
                </div>
                <div className='flex w-full gap-3 sm:gap-1 lg:gap-3 sm:w-fit justify-center'>
                  <button
                    onClick={handleFilter}
                    className='bg-blue-600 px-5 py-2 w-fit rounded-lg font-semibold text-white dark:bg-blue-500 hover:bg-blue-800 md:px-3 lg:px-5 '
                  >
                    Filter
                  </button>
                  <button
                    onClick={clearFilters}
                    className='bg-red-500 px-3 py-2 w-fit rounded-lg font-medium text-white dark:bg-red-500 hover:bg-red-600'
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
            {!showFilter && (
              <div className='flex flex-col gap-y-2 sm:flex-row sm:gap-x-3 md:gap-x-1 lg:gap-x-3 sm:items-center w-full md:w-fit'>
                <div className='flex w-full gap-3 sm:gap-1 lg:gap-3 sm:w-fit justify-center'>
                  <button
                    onClick={() => {
                      setShowFilter(true);
                    }}
                    className='bg-green-500 px-3 py-2 w-fit rounded-lg font-medium text-white dark:bg-green-500 hover:bg-green-600'
                  >
                    Show Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          {isFilter && (
            <h2 className='flex flex-wrap w-full text-xl mx-auto font-medium '>
              Showing results from{' '}
              <span className=' w-fit mx-3 text-green-600'>
                {formatDate(filteredDates.start)}
              </span>{' '}
              to{' '}
              <span className=' w-fit text-green-600 ml-3'>
                {formatDate(filteredDates.end)}
              </span>
            </h2>
          )}
          {query && (
            <h2 className='flex flex-wrap w-full text-xl mx-auto font-medium '>
              Showing results for{' '}
              <span className=' ml-3 text-green-600 max-w-[90%] inline-flex break-all whitespace-pre-wrap '>
                {query}
              </span>
            </h2>
          )}
          <ExpenseTable filteredExpenses={filteredExpenses}></ExpenseTable>
        </div>
      ) : (
        <p className='flex min-h-[30rem] justify-center items-center text-xl mx-auto w-full font-semibold md:text-2xl'>
          You haven't added any expenses
        </p>
      )}
    </div>
  );
};

export default AllExpenses;
