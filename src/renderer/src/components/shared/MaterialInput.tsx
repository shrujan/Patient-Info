
export default function MaterialInput({
  id,
  label,
  error,
  type = "text",
  placeholder = '',
  ...inputProps
}: {
  id: string,
  label: string
  error?: string
  type?: string,
  placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const isDate = type === "date"

  return (
    <div className="relative w-full">
      <input
        id={ id }
        type={type}
        placeholder={ placeholder }
        className={`peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-5 pb-1 text-sm text-gray-400
          focus:border-blue-600 focus:outline-none transition-colors
          placeholder-transparent
          [&::-webkit-calendar-picker-indicator]:cursor-pointer
          [&::-webkit-calendar-picker-indicator]:rounded
          [&::-webkit-calendar-picker-indicator]:p-1
          [&::-webkit-calendar-picker-indicator]:hover:bg-blue-100
          [&::-webkit-calendar-picker-indicator]:transition-colors
          [&::-webkit-calendar-picker-indicator]:invert
          [&::-webkit-calendar-picker-indicator]:opacity-60
          [&::-webkit-calendar-picker-indicator]:hover:opacity-100`}
        {...inputProps}
      />
      <label
        htmlFor={ id }
        className={`absolute left-0 text-sm transition-all duration-200
          ${isDate
            ? 'top-0 text-xs text-gray-500 peer-focus:text-blue-600'
            : `top-4 text-gray-500
               peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
               peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600
               peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-500`
          }`}
      >
        {label}
      </label>
      <div
        className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-blue-600 transition-all duration-300
          peer-focus:left-0 peer-focus:w-full"
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </div>
  )
}
