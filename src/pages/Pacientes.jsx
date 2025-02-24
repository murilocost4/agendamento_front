import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import Tabela from "../components/tabela";
import Botao from "../components/botao";
import { Link } from "react-router-dom";
import { obterPacientes, excluirPaciente } from "../api"; // Importando funções para obter e excluir pacientes
import ModalConfirmacao from "../components/ModalConfirmacao"; // Importando o Modal de Confirmação

const Pacientes = () => {
  const headers = ["Nome", "Cpf", "Fone", "Convênio", "Ações"];
  const [search, setSearch] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para controlar o modal de exclusão
  const [modalOpen, setModalOpen] = useState(false);
  const [pacienteExcluir, setPacienteExcluir] = useState(null); // Guardar o paciente a ser excluído

  // Função para buscar pacientes do backend
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await obterPacientes();
        setPacientes(data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar pacientes");
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  // Filtrar os dados com base na pesquisa
  const filteredData = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(search.toLowerCase())
  );

  // Função para redirecionamento para o cadastro de paciente
  const redirectToCadastro = (paciente) => {
    return `/pacientes-cadastro/${paciente.id}`; // Use o id para redirecionamento
  };

  // Função para excluir paciente
  const handleExcluir = async () => {
    try {
      await excluirPaciente(pacienteExcluir.id); // Exclui o paciente
      setPacientes(pacientes.filter((paciente) => paciente.id !== pacienteExcluir.id));
      alert("Paciente excluído com sucesso!");
    } catch (err) {
      alert("Erro ao excluir paciente.");
    } finally {
      setModalOpen(false); // Fecha o modal após a exclusão
    }
  };

  // Função para abrir o modal e definir o paciente a ser excluído
  const openModal = (paciente) => {
    setPacienteExcluir(paciente); // Guarda o paciente que será excluído
    setModalOpen(true); // Abre o modal
  };

  // Estrutura dos dados da tabela
  const tableData = filteredData.map((paciente) => ({
    rowData: [
      paciente.nome,      // Nome do paciente
      paciente.cpf,       // CPF do paciente
      paciente.telefone,  // Telefone do paciente
      paciente.convenio,  // Convênio do paciente
      <div className="flex gap-2">
        {/* Botão de editar */}
        <Link to={`/pacientes-cadastro/${paciente.id}`}>
          <FiEdit className="text-blue-500 cursor-pointer" />
        </Link>
        {/* Botão de excluir */}
        <FiTrash2
          onClick={() => openModal(paciente)} // Abre o modal de confirmação
          className="text-red-500 cursor-pointer"
        />
      </div>, // Coluna de ações
    ],
    id: paciente.id,     // ID para redirecionamento
  }));

  return (
    <div className="flex flex-col flex-1 p-6 w-full">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold">Pacientes</h1>

        <div className="flex gap-4 w-full sm:w-auto">
          {/* Campo de pesquisa */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Pesquisar paciente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Botão reutilizável */}
          <Link to="/pacientes-cadastro">
            <Botao texto="Adicionar" icone={FiPlus} />
          </Link>
        </div>
      </div>

      {/* Exibindo a mensagem de erro ou carregamento */}
      {loading ? (
        <p>Carregando pacientes...</p>
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
        pacienteNome={pacienteExcluir ? pacienteExcluir.nome : ""} // Nome do paciente a ser excluído
      />
    </div>
  );
};

export default Pacientes;
