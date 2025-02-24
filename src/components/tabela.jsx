import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const Tabela = ({ headers = [], data = [], redirectTo, actionsColumn }) => {
  const navigate = useNavigate();

  const handleRowDoubleClick = (row) => {
    navigate(redirectTo(row));
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full max-w-full border-collapse cursor-default">
          <thead className="bg-gray-200">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-3 text-left text-gray-700">
                  {header}
                </th>
              ))}
              {actionsColumn && <th className="px-6 py-3 text-gray-700">Ações</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {data.map(({ rowData = [], servico }, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 cursor-pointer`}
                onDoubleClick={() => handleRowDoubleClick(servico)}
              >
                {rowData.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-3 text-gray-700">
                    {cell}
                  </td>
                ))}
                {actionsColumn && (
                  <td className="px-6 py-3 text-gray-700">{actionsColumn({ servico })}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Tabela.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      rowData: PropTypes.array.isRequired,
      servico: PropTypes.any,
    })
  ).isRequired,
  redirectTo: PropTypes.func.isRequired,
  actionsColumn: PropTypes.func,
};

export default Tabela;