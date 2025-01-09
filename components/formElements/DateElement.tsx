import React from 'react';

interface Props {
  name: string;
  isError?: boolean;
  defaultValue?: string; // ISO 8601 string (e.g., "2023-01-01")
  error?: string; // To show error messages
}

const DateElement: React.FC<Props> = ({
  name,
  isError,
  defaultValue,
  error,
}) => {
  const customLabels: { [key: string]: string } = {
    date_of_birth: 'date of birth',
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
        type="date"
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={`Please select your ${labelName}`}
        className={`rounded-md w-full p-2 shadow-md bg-white font-man text-md md:text-xl border ${
          isError ? 'border-[red]' : 'border-black'
        }`}
      />
      {isError && error && (
        <p className="text-red-500 text-sm md:text-base">{error}</p>
      )}
    </div>
  );
};

export default DateElement;
