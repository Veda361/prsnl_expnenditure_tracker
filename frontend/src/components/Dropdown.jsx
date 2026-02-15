import React from "react";

const Dropdown = ({ options, value, onChange }) => {
  const isGrouped = !Array.isArray(options);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border-[0.19rem] border-black rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select an option</option>

      {/* If normal array (like types) */}
      {!isGrouped &&
        options.map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}

      {/* If grouped object (like categories) */}
      {isGrouped &&
        Object.entries(options).map(([group, items]) => (
          <optgroup key={group} label={group}>
            {items.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </optgroup>
        ))}
    </select>
  );
};

export default Dropdown;