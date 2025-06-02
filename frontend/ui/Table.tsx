import React from "react";

interface TableProps {
  initialHeaders: string[];
  initialData: (string | React.ReactNode)[][];
}

export default function Table({ initialHeaders, initialData }: TableProps) {
  return (
    <div className="w-full">
      <div className="hidden rounded-sm border border-gray-400 bg-white md:block">
        <table className="min-w-full">
          <thead className="bg-gray-400">
            <tr>
              {initialHeaders.map((header, colIndex) => (
                <th
                  key={colIndex}
                  className="px-6 py-2 text-xs font-semibold text-white"
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
                className={`${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
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

      <div className="w-[70vw] md:hidden">
        {initialData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`mx-auto mb-4 grid w-full max-w-xl gap-3 rounded-sm border border-gray-200 p-4 ${
              rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="mb-2 flex w-full justify-between text-sm"
              >
                <span className="font-semibold text-gray-700">
                  {initialHeaders[colIndex]}:
                </span>
                <span className="text-gray-800">{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
