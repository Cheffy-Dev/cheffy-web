import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';

const LocationOptions = ({ location }) => {
  return (
    <div className='ac-row hover:bg-inputBg focus:bg-inputBg justify-evenly items-center my-3 location-highlighter-div'>
      <div className='rounded-full hover:bg-inputBg location-highlighter-marker cursor-pointer'>
        <HiLocationMarker className='text-2xl' />
      </div>
      <div className='flex-wrap'>
        <span className='block w-full font-bold text-lg cursor-pointer'>
          {location.main}
        </span>
        <span className='block w-full font-light cursor-pointer'>
          {location.secondary}
        </span>
      </div>
    </div>
  );
};

export default LocationOptions;
