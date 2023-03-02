export default function Dropdown({ name, css }) {
  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="absolute text-[#666666] bg-white font-montserrat focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                    text-sm px-4 py-2.5 text-center inline-flex items-center border-[1px] 
                    border-solid border-[##CAC4C4] shadown-black/25 top-[7.84%] bottom-[88.36%]"
        type="button"
      >
        {name + " "}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
    </>
  );
}
