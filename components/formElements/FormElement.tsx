import React from 'react';

interface Props {
  name: string;
  type: string;
  isError?: boolean;
  defaultValue?: string;
  error?: string; // To show error messages
}

const FormElement: React.FC<Props> = ({
  name,
  type,
  isError,
  error,
  defaultValue,
}) => {
  const customLabels: { [key: string]: string } = {
    f_name: 'first name',
    l_name: 'last name',
    confirmPassword: 'confirmed password',
    address_details: 'address details',
    address_name: 'address name',
  };
  const labelName = customLabels[name] || name;
  return (
    <div className="flex flex-col justify-center items-start gap-y-2 w-full">
      <label
        htmlFor={name}
        className="capitalize font-man text-lg md:text-xl lg:text-2xl font-semibold"
      >
        {labelName}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={`Please insert your ${labelName}`}
        className={`rounded-md w-full p-2 shadow-md bg-white font-man text-md md:text-xl  border ${
          isError ? 'border-[red]' : 'border-black'
        }`}
      />
      {isError && error && (
        <p className="text-red-500 text-sm md:text-base">{error}</p>
      )}
    </div>
  );
};

export default FormElement;
