import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LinkItem = ({ item }) => {

  // Replace anchor tag with react-router-dom Link component and remove 'target' attr. add 'to' instead of href
  return (
    <li className='text-gray-300 mb-1'>
      <a href={item?.link || "https://www.google.com"} target='_blank' className='flex items-center outline-none border border-transparent 
      focus-visible:border-white rounded'>
        <FontAwesomeIcon icon={item.icon} className='w-9' />
        <span>
          {item.name}
        </span>
      </a>
    </li>
  )
}

export default LinkItem;