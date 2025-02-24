import React, { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import Tabela from "../components/tabela";
import Botao from "../components/botao";
import { Link } from "react-router-dom";

const Agendamentos = () => {
  const headers = ["Paciente", "Profissional", "Data", "Horário", "Status"];
  const [searchPaciente, setSearchPaciente] = useState("");
  const [searchProfissional, setSearchProfissional] = useState("");
  const [searchData, setSearchData] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const statusOptions = ["Todos", "Confirmado", "Pendente", "Cancelado"];

  const data = [
    ["João Silva", "Dr. Pedro Lima", "12/03/2025", "14:30", "Confirmado"],
    ["Maria Souza", "Dra. Ana Costa", "15/03/2025", "10:00", "Pendente"],
    ["Carlos Pereira", "Dr. João Silva", "20/03/2025", "09:30", "Confirmado"],
    // Adicione mais dados conforme necessário
  ];

  // Função para filtrar os dados com base nos critérios de pesquisa
  const filteredData = data.filter((row) =>
    row[0].toLowerCase().includes(searchPaciente.toLowerCase()) &&
    row[1].toLowerCase().includes(searchProfissional.toLowerCase()) &&
    row[2].includes(searchData) &&
    (searchStatus === "Todos" || row[4].toLowerCase().includes(searchStatus.toLowerCase()))
  );

  // Redirecionamento para a página de cadastro
  const redirectToCadastro = (agendamento) => {
    return `/agendamentos-cadastro/${agendamento[0]}`; // Aqui você pode escolher como usar o ID
  };

  // Transformação dos dados para o formato esperado pela Tabela
  const formattedData = filteredData.map((row) => ({
    rowData: row, // Cada linha é um array de dados
    servico: row,  // Você pode passar o objeto completo para o Tabela, se necessário
  }));

  return (
    <div className="flex flex-col flex-1 p-6 w-full">
      {/* Título */}
      <h1 className="text-2xl font-bold mb-4">Agendamentos</h1>

      {/* Filtros de Pesquisa */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
        <div className="flex gap-4 w-full sm:w-auto">
          {/* Campo de pesquisa de paciente */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Pesquisar Paciente"
              value={searchPaciente}
              onChange={(e) => setSearchPaciente(e.target.value)}
              className="w-full sm:w-64 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Campo de pesquisa de profissional */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Pesquisar Profissional"
              value={searchProfissional}
              onChange={(e) => setSearchProfissional(e.target.value)}
              className="w-full sm:w-64 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Campo de seleção de data */}
          <div className="relative flex-1">
            <input
              type="date"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="w-full sm:w-40 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Campo seletivo de status */}
          <div className="relative flex-1">
            <select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              className="w-full sm:w-40 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botão de adicionar com texto alterado */}
        <Link to="/agendamentos-cadastro" className="sm:ml-4">
          <Botao texto="Nova Solicitação" icone={FiPlus} />
        </Link>
      </div>

      {/* Tabela */}
      <Tabela
        headers={headers}
        data={formattedData}
        redirectTo={redirectToCadastro}
      />
    </div>
  );
};

export default Agendamentos;
