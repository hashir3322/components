import React, { useEffect } from 'react';
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import LinkItem from './Link';

const Submenu = ({ item, expandParentSubmenu, collapseParentSubmenu, isParentOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef(null);
  const subMenuRef = useRef(null);

  useEffect(() => {

    if (isParentOpen == undefined) {
      return;
    }

    // if parent menu's state is changed to close and current submenu is open, close it too
    if (!isParentOpen && isExpanded) {
      changeContainerHeight(0);
      setIsExpanded(prev => !prev);
    }

  }, [isParentOpen])

  const getContainerHeight = () => {
    return parseInt(window.getComputedStyle(subMenuRef.current).height);
  }

  const toggleSubMenu = (e) => {

    const height = getContainerHeight();
    if (!isExpanded) {
      
      changeContainerHeight(height);
      
      if (expandParentSubmenu) {
        expandParentSubmenu(height)
      }
    }
    else {

      if (collapseParentSubmenu) {
        collapseParentSubmenu(height);
      }

      changeContainerHeight(0);
    }

    setIsExpanded(prev => !prev);
  }

  /**
   * @description expands current submenu and propagates the changes up in the heirarchy so that the parent submen (if any)
   * can also adjust its height
   * @param {number} heightToDeduct 
   */
  const expandSubmenu = (heightToAdd) => {
    const height = getContainerHeight();
    const total = height + heightToAdd;
    // containerRef.current.style.height = `${total}px`;

    changeContainerHeight(total);

    // if current submenu is a child of another submenu expand the parent submenu's height too
    expandParentSubmenu && expandParentSubmenu(heightToAdd);
  }

  /**
   * @description closes current submenu and propagates the changes up in the heirarchy so that the parent submen (if any)
   * can also adjust its height
   * @param {number} heightToDeduct 
   */
  const collapseSubmenu = (heightToDeduct) => {
    const height = getContainerHeight();
    const total = Math.abs(height - heightToDeduct);

    changeContainerHeight(total);

    // if current submenu is a child of another submenu collapse the parent submenu's height too using this callback
    collapseParentSubmenu && collapseParentSubmenu(heightToDeduct);
  }

  const changeContainerHeight = (height) => {
    containerRef.current.style.height = `${height}px`;
  }

  return (
    <>
      <li className='text-gray-300 mb-1'>
        <button type="button" onClick={toggleSubMenu} className='w-full flex items-center outline-none border border-transparent focus-visible:border-white rounded'>
          <FontAwesomeIcon icon={item.icon} className='w-9' />
          <span>
            {item.name}
          </span>
          {item?.subMenu?.length && (
            <FontAwesomeIcon icon={faChevronDown} className={`ml-auto mr-2 transition-all duration-300 ease-in-out
            ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
          )}
        </button>
      </li>
      <div className={`overflow-hidden h-0 transition-all duration-300 ease-in-out ${isExpanded ? 'visible' : 'invisible'}`} ref={containerRef}>
        <ul className="list-none py-1 pl-3" ref={subMenuRef}>
          {item?.subMenu.map((subItem, index) => (
            // If it is submenu, recursively render this component otherwise keep rendering a regular link item
            subItem?.subMenu?.length ? (
              <Submenu item={subItem} key={index} expandParentSubmenu={expandSubmenu} collapseParentSubmenu={collapseSubmenu} isParentOpen={isExpanded} />
            ) : (
              <LinkItem item={subItem} key={index} />
            )

          ))}
        </ul>
      </div>
    </>
  )
}

export default Submenu;