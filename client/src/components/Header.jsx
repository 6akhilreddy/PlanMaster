import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/userSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state['user']);

  return (
    <div className='fixed w-full z-[999] top-0 bg-black'>
      <div className='sticky z-10 w-full py-4 px-3 mx-auto bg-black bg-opacity-100 text-white rounded-none border-none md:px-8 md:py-4 lg:py-5'>
        <div className='mx-auto flex items-center justify-between'>
          <Link to={'/'}>
            <div className='flex items-center gap-x-1'>
              <img
                src='/planning.svg'
                alt='Plan Master'
                className='h-7 w-7 md:h-10 md:w-10 cursor-pointer'
              />
              <span className='text-2xl font-medium text-white'>
                Plan Master
              </span>
            </div>
          </Link>
          <div className='mx-auto flex items-center justify-between hidden lg:block'>
            <Link to={'/'}>
              <span className='text-xl font-semibold text-white mx-8'>
                Home
              </span>
            </Link>
            <Link to={'/expense'}>
              <span className='text-xl font-semibold text-white mx-8'>
                Expense
              </span>
            </Link>
            <Link to={'/task'}>
              <span className='text-xl font-semibold text-white mx-8'>
                Task
              </span>
            </Link>
          </div>
          <button
            size='sm'
            className='inline-block bg-deepOrange hover:shadow-none'
            onClick={() => dispatch(logout())}
          >
            <span className='text-lg font-semibold'>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
