import React from "react";

const Botao = ({ texto, icone: Icone, onClick, tipo = "button", classeExtra = "" }) => {
  return (
    <button
      type={tipo}
      onClick={onClick}
      className={`flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition ${classeExtra}`}
    >
      {Icone && <Icone size={18} className="text-gray-600" />}
      <span>{texto}</span>
    </button>
  );
};

export default Botao;
