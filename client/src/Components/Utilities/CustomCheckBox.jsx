const CustomCheckbox = ({ checked, onChange }) => {
    return (
      <div
        className="cursor-pointer checkbox border rounded border-gray-400 w-6 h-6 flex items-center justify-center mr-2"
        onClick={onChange}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-blue-600 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M20 4L9 15l-5-5" />
          </svg>
        )}
      </div>
    );
  };
  
  export default CustomCheckbox;
 
  
  
  
  
  
  