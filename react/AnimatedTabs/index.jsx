import React, { useEffect, useRef, useState } from "react";

// const list = ['O', 'Two', 'Three', 'Fourrr', 'FIveeeeeee'];

const AnimatedTab = ({ types, setType }) => {
  const inkBarRef = useRef();
  const containerRef = useRef();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    initInkBar();
  }, [])

  /** 
  @desc Initialize sliding inkbar at first element's position
  */
  const initInkBar = () => {
    const elementList = containerRef.current.children;
    // get dimensions of first element i.e first tab
    const firstChildWidth = elementList[0].getBoundingClientRect().width;
    animateInkBar(0, firstChildWidth);
  }

  const handleTabChanges = (e, index, galleryType) => {
    if (index === activeTabIndex) {
      return;
    }

    const clickedItemWidth = e.target.getBoundingClientRect().width;
    const dist = getDistanceToTranslate(index);

    animateInkBar(dist, clickedItemWidth);

    setActiveTabIndex(index);
    setType(galleryType);
  }


  /** 
  @desc calculates distance upto which tab the inkbar have to move. Iterates through each child of tabs container
  and accumulates the width (including padding) of all the tabs except the clicked one.
  @param to - Index of element upto which we have to move the inkbar
  */
  const getDistanceToTranslate = (to) => {
    const elementList = Array.from(containerRef.current.children).slice(0, to);

    const distance = elementList.reduce((prev, curr) => {
      return prev + curr.getBoundingClientRect().width;
    }, 0)

    return distance;
  }

  /** 
  @desc animates inkbar's width as well as translateX according to given distance & width
  @param dist - Distance, how much pixels to translate the inkbar
  @param width - how much of width (in pixels) to give to the inkbar to match current tab's width
  */
  const animateInkBar = (dist, width) => {
    inkBarRef.current.style.transform = `translateX(${dist}px)`;
    inkBarRef.current.style.width = `${width}px`;
  }

  return (
    <div className="flex justify-center">
      <div className="relative">
        <div ref={containerRef} className="flex border-b-[1px] border-b-[#ddd] w-fit">
          {types.map((item, index) => (
            <button key={index} className="cursor-pointer w-full py-2 px-5 text-[#303030] uppercase text-base font-normal
            tracking-wider" onClick={(e) => handleTabChanges(e, index, item)}>
              {item}
            </button>
          ))}
        </div>
        <div ref={inkBarRef} className={`inkbar absolute transition-all duration-300 ease-out bottom-0 left-0 translate-x-0 h-[1px] border-t-[1px] border-[#1E1E1E]`}></div>
      </div>
    </div>
  );
}

export default AnimatedTab;
