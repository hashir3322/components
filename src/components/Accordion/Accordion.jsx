import React, { useState, useRef } from 'react';
import './accordion.css';


const accordionOptions = [
  "Item 1",
  "Item 2",
  "Item 3"
]
// can be configured with data comming as props later on.
const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef(null);

  /** 
    @description toggles the state of accordion
  */
  const clickHandler = () => {
    if(!listRef.current){
      return;
    }

    if(isOpen){
      close();
    }else{
      open();
    }
  }
  
  /** 
    @description opens the accordion
  */
  const open = () => {
    // get array of children of accordion.
    const childItemsList = Array.from(listRef.current.children);
    if(!childItemsList.length){
      return;
    }
    
    const height = calculateTotalHeight(listRef.current, childItemsList);

    setHeight(height);    
    setIsOpen(true);
  }
  
  /** 
    @description closes the accordion
  */  
  const close = () => {
    setHeight(0);
    setIsOpen(false);
  }

  /** 
    @description sets the height of the accordion.
  */
  const setHeight = (height) => {
    listRef.current.style.height = `${height}px`;
  }

  /** 
    @description Calculates the total height to which we have to expand the accordion (i.e ul).
    @param {Node} elRef element whose height we have to calculate. It is not react element but HTML node.
    @param {Array} childItemsList array of child elements of elRef.
    @return {number} total height.
  */
  const calculateTotalHeight = (elRef, childItemsList) => {
    // get gap applied between each item
    // if you want to add other styles that affect height, make sure to take them
    // into account as well by using window.getComputedStyle(yourElementRef)    
    let gap = parseInt(window.getComputedStyle(elRef).gap);

    if(!gap){
      gap = 0;
    }
    
    // Calculate height by calculating total height of each child item
    let height = childItemsList.reduce((prev, curr, index) => {
      let currHeight = curr.getBoundingClientRect().height;

      /* getComputed style returns dimensions related styles in px values. parseInt will convert
      these values to integer values removing the 'px' (e.g '10px' will be '10' only) */
      // const marginTop = parseInt(window.getComputedStyle(curr).marginTop);
      // const marginBottom = parseInt(window.getComputedStyle(curr).marginBottom);
      
      // currHeight = currHeight + (marginTop + marginBottom);
      
      // use above three lines of code if you have used margin top or bottom on each list item (i.e li).
      // using gap is cleaner and prevents extra calculations as we only need to get parent's gap once.

      // since gap is applied in between flex items, we don't need to account for it on the last 
      // iteration. Gap is not applied on start and end of items.
      if(index < childItemsList.length - 1){
        currHeight += gap;
      }
      
      return prev + currHeight;
    }, 0)

    return height;
  }
  
  return (
    <div className='accordion-container'>
      <button type='button' onClick={clickHandler}>Toggler</button>
      <p>Click the toggle button above to show the list</p>
      <ul className='list' ref={listRef}>
        {accordionOptions.map((opt, index) => (
          <li key={index}>{opt}</li>
        ))}
      </ul>
    </div>
  )
}

export default Accordion;