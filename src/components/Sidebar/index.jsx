import React from 'react';
import { faRightToBracket, faUserPlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Submenu from './submenu';
import LinkItem from './Link';

const Sidebar = ({ isOpen }) => {

  return (
    <div className={`bg-[#262626] absolute transition-all duration-300 ease-in-out top-0 h-full w-[235px]
     ${isOpen ? 'visible left-0' : 'invisible -left-[235px]'}`}>
      <ul className="list-none py-5 px-1">
        {MENU_ITEMS.map((item, index) => (
          item?.subMenu?.length ? (
            <Submenu item={item} key={index} />
          ) : (
            <LinkItem item={item} key={index} />
          )
        ))}
      </ul>
    </div>
  )
}

export default Sidebar;


const MENU_ITEMS = [
  {
    name: 'login',
    icon: faRightToBracket,
    link: 'https://www.youtube.com'
  },
  {
    name: 'register',
    icon: faUserPlus
  },
  {
    name: '1. Test',
    icon: faPlus,
    subMenu: [
      {
        name: '1.1 Test',
        icon: faRightToBracket,
        subMenu: [
          {
            name: '1.1.1 Test',
            icon: faRightToBracket,
            subMenu: [
              {
                name: '1.1.1.1 Test',
                icon: faRightToBracket,
              },
              {
                name: '1.2.1.1 register',
                icon: faUserPlus
              },
            ]
          },
          {
            name: '1.2.1 register',
            icon: faUserPlus
          },
        ]
      },
      {
        name: '1.2 register',
        icon: faUserPlus,
        subMenu: [
          {
            name: '1.1 Test',
            icon: faRightToBracket,
          },
          {
            name: '1.2 register',
            icon: faUserPlus
          },
        ]
      },
    ]
  },
  {
    name: 'register',
    icon: faUserPlus
  },
]