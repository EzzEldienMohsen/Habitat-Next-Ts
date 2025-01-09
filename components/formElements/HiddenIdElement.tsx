import React from 'react';



const HiddenIdElement: React.FC<{id:number|undefined}> = ({  id }) => {
  return (
    <div className="hidden">
      <input
        type="hidden"
        name="id"
        value={id? id : ""}
      />
    </div>
  );
};

export default HiddenIdElement;
