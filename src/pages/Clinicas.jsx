import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import Tabela from "../components/tabela";
import Botao from "../components/botao";
import { Link } from "react-router-dom";
import { obterClinicas, excluirClinica } from "../api"; // Importando funções para obter e excluir clínicas
import ModalConfirmacao from "../components/ModalConfirmacao"; // Importando o Modal de Confirmação

const Clinicas = () => {
  const headers = ["Nome", "CNPJ", "Telefone", "Endereço", "Ações"];
  const [search, setSearch] = useState("");
  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para controlar o modal de exclusão
  const [modalOpen, setModalOpen] = useState(false);
  const [clinicaExcluir, setClinicaExcluir] = useState(null); // Guardar a clínica a ser excluída

  // Função para buscar clínicas do backend
  useEffect(() => {
    const fetchClinicas = async () => {
      try {
        const data = await obterClinicas();
        setClinicas(data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar clínicas");
        setLoading(false);
      }
    };

    fetchClinicas();
  }, []);

  // Filtrar os dados com base na pesquisa
  const filteredData = clinicas.filter((clinica) =>
    clinica.descricao.toLowerCase().includes(search.toLowerCase())
  );

  // Função para redirecionamento para o cadastro de clínica
  const redirectToCadastro = (clinica) => {
    return `/clinicas-cadastro/${clinica.id}`; // Use o id para redirecionamento
  };

  // Função para excluir clínica
  const handleExcluir = async () => {
    try {
      await excluirClinica(clinicaExcluir.id); // Exclui a clínica
      setClinicas(clinicas.filter((clinica) => clinica.id !== clinicaExcluir.id));
      alert("Clínica excluída com sucesso!");
    } catch (err) {
      alert("Erro ao excluir clínica.");
    } finally {
      setModalOpen(false); // Fecha o modal após a exclusão
    }
  };

  // Função para abrir o modal e definir a clínica a ser excluída
  const openModal = (clinica) => {
    setClinicaExcluir(clinica); // Guarda a clínica que será excluída
    setModalOpen(true); // Abre o modal
  };

  // Estrutura dos dados da tabela
  const tableData = filteredData.map((clinica) => ({
    rowData: [
      clinica.descricao,  // Nome da clínica
      clinica.cnpj,       // CNPJ da clínica
      clinica.telefone,   // Telefone da clínica
      clinica.endereco,   // Endereço da clínica
      <div className="flex gap-2">
        {/* Botão de editar */}
        <Link to={`/clinicas-cadastro/${clinica.id}`}>
          <FiEdit className="text-blue-500 cursor-pointer" />
        </Link>
        {/* Botão de excluir */}
        <FiTrash2
          onClick={() => openModal(clinica)} // Abre o modal de confirmação
          className="text-red-500 cursor-pointer"
        />
      </div>, // Coluna de ações
    ],
    id: clinica.id,     // ID para redirecionamento
  }));

  return (
    <div className="flex flex-col flex-1 p-6 w-full">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold">Clínicas</h1>

        <div className="flex gap-4 w-full sm:w-auto">
          {/* Campo de pesquisa */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Pesquisar clínica..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Botão reutilizável */}
          <Link to="/clinicas-cadastro">
            <Botao texto="Adicionar" icone={FiPlus} />
          </Link>
        </div>
      </div>

      {/* Exibindo a mensagem de erro ou carregamento */}
      {loading ? (
        <p>Carregando clínicas...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Tabela
          headers={headers}
          data={tableData}
          redirectTo={redirectToCadastro}
        />
      )}

      {/* Modal de confirmação de exclusão */}
      <ModalConfirmacao
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)} // Fecha o modal
        onConfirm={handleExcluir} // Confirma a exclusão
        clinicaNome={clinicaExcluir ? clinicaExcluir.descricao : ""} // Nome da clínica a ser excluída
      />
    </div>
  );
};

export default Clinicas;