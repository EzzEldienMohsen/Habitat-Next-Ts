import React from 'react';



const HiddenIdElement: React.FC<{id:number}> = ({  id }) => {
  return (
    <div className="hidden">
      <input
        type="hidden"
        name="id"
        value={id}
      />
    </div>
  );
};

export default HiddenIdElement;
