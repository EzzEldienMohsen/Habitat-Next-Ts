"use client"
import React from 'react'
import { useFormStatus } from 'react-dom';

const DeleteButton:React.FC<{name:string}> = ({name}) => {
      const status = useFormStatus();

  return (
      <button
      disabled={status.pending}
      className="btn bg-blue-500 text-white px-4 py-2 rounded-md mt-4 flex justify-center items-center"
    >
      {status.pending ? (
        <span className="loading loading-spinner loading-lg text-blue-300 capitalize"></span>
      ) : (
        `Delete ${name}`
      )}
    </button>
  )
}

export default DeleteButton