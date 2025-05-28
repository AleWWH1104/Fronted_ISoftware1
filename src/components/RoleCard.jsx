import { useState } from "react";

export default function RoleCard() {
  const [selected, setSelected] = useState(false);

  const toggleSelection = () => {
    setSelected(!selected);
  };

  return (
    <label
      className={`cursor-pointer border rounded-xl p-4 transition flex justify-between items-start mb-2
        ${selected ? "border-blue-600 ring-2 ring-blue-400" : "border-gray-300"}
      `}
    >
      {/* Hidden checkbox for accessibility and interaction */}
      <input
        type="checkbox"
        checked={selected}
        onChange={toggleSelection}
        className="absolute opacity-0 pointer-events-none"
      />

      {/* Content */}
      <div className="pr-6">
        <h4 className="text-blue-700 font-semibold text-lg">Admin</h4>
        <p className="text-black mt-1">
          Control total del sistema. Tiene todos los permisos
        </p>
      </div>

      {/* Custom check circle */}
      <span
        className={`h-5 w-5 border-2 rounded-full mt-1 transition
          ${selected ? "bg-blue-600 border-blue-600" : "border-black"}
        `}
      >
        {selected && (
          <span className="block h-2.5 w-2.5 m-auto mt-0.5 rounded-full bg-white"></span>
        )}
      </span>
    </label>
  );
}
