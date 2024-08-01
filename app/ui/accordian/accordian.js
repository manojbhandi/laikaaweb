import React , { useState} from 'react'
import clsx from 'clsx';

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div  className={clsx(" w-56",
        {
            "border-b border-gray-200" : title != 'Sort By :'
        }
      )}>
        <button
          className= {clsx("flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100  hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75",
            {
                "rounded-t-lg" : title == 'Brands',
                "rounded-lg" : title == 'Sort By :'
            },
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{title}</span>
          <span>{isOpen ? '-' : '+'}</span>
        </button>
        {isOpen && (
          <div className="px-4 pt-2 pb-4 text-sm text-gray-500">
            {children}
          </div>
        )}
      </div>
    );
  };
  export default Accordion;