import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import Tabela from "../components/tabela";
import Botao from "../components/botao";
import { Link } from "react-router-dom";
import { obterProfissionais, excluirProfissional } from "../api"; // Funções para obter e excluir profissionais
import ModalConfirmacao from "../components/ModalConfirmacao"; // Modal de confirmação

const Profissionais = () => {
  const headers = ["Nome", "Especialidade", "CRM", "Telefone", "Ações"];
  const [search, setSearch] = useState("");
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para controlar o modal de exclusão
  const [modalOpen, setModalOpen] = useState(false);
  const [profissionalExcluir, setProfissionalExcluir] = useState(null); // Guardar o profissional a ser excluído

  // Função para buscar profissionais do backend
  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const data = await obterProfissionais();
        console.log(data); // Verifique a estrutura dos dados
        setProfissionais(data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar profissionais");
        setLoading(false);
      }
    };
  
    fetchProfissionais();
  }, []);
  

  // Filtrar os dados com base na pesquisa
  const filteredData = profissionais.filter((profissional) =>
    profissional.nome.toLowerCase().includes(search.toLowerCase())
  );

  // Função para redirecionamento para o cadastro de profissional
  const redirectToCadastro = (profissional) => {
    return `/profissionais-cadastro/${profissional.id}`; // Use o id para redirecionamento
  };

  // Função para excluir profissional
  const handleExcluir = async () => {
    try {
      await excluirProfissional(profissionalExcluir.id); // Exclui o profissional
      setProfissionais(profissionais.filter((profissional) => profissional.id !== profissionalExcluir.id));
      alert("Profissional excluído com sucesso!");
    } catch (err) {
      alert("Erro ao excluir profissional.");
    } finally {
      setModalOpen(false); // Fecha o modal após a exclusão
    }
  };

  // Função para abrir o modal e definir o profissional a ser excluído
  const openModal = (profissional) => {
    setProfissionalExcluir(profissional); // Guarda o profissional que será excluído
    setModalOpen(true); // Abre o modal
  };

  // Estrutura dos dados da tabela
  const tableData = filteredData.map((profissional) => ({
    rowData: [
        profissional.nome || '',  // Garantir que é uma string
        profissional.id_especialidade || '',  // Garantir que é uma string
        profissional.crm || '',  // Garantir que é uma string
        profissional.telefone || '',  // Garantir que é uma string
        <div className="flex gap-2">
          <Link to={`/profissionais-cadastro/${profissional.id}`}>
            <FiEdit className="text-blue-500 cursor-pointer" />
          </Link>
          <FiTrash2
            onClick={() => openModal(profissional)}
            className="text-red-500 cursor-pointer"
          />
        </div>
      ],
    id: profissional.id,           // ID para redirecionamento
  }));

  return (
    <div className="flex flex-col flex-1 p-6 w-full">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold">Profissionais</h1>

        <div className="flex gap-4 w-full sm:w-auto">
          {/* Campo de pesquisa */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Pesquisar profissional..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Botão reutilizável */}
          <Link to="/profissionais-cadastro">
            <Botao texto="Adicionar" icone={FiPlus} />
          </Link>
        </div>
      </div>

      {/* Exibindo a mensagem de erro ou carregamento */}
      {loading ? (
        <p>Carregando profissionais...</p>
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
        profissionalNome={profissionalExcluir ? profissionalExcluir.nome : ""} // Nome do profissional a ser excluído
      />
    </div>
  );
};

export default Profissionais;
