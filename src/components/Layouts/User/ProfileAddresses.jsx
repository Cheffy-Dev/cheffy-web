import React from 'react';

const ProfileAddresses = ({ address }) => {
  if (address.loading)
    return <h1>loading</h1>

  return (
    <>
      {
        address.user.address.map(_address => (
          <>
            <p>{_address.state}</p>
            <p>{_address.city}</p>
            <p>{_address.addressLine1}</p>
            <p>{_address.addressLine2}</p>
            <p>{_address.deliveryNote}</p>
          </>
        ))
      }
    </>
  )
};

export default ProfileAddresses;
