import React from "react";

interface TableProps {
  initialHeaders: string[];
  initialData: (string | React.ReactNode)[][];
}

export default function Table({ initialHeaders, initialData }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-sm border border-gray-400 bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-400">
          <tr>
            {initialHeaders.map((header, colIndex) => (
              <th
                key={colIndex}
                className="px-6 py-2 text-left text-xs font-semibold text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {initialData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-sm whitespace-nowrap text-gray-800"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
