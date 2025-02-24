import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Botao from "../components/botao";
import Tabela from "../components/tabela";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineEdit, MdOutlineDeleteOutline, MdAdd } from "react-icons/md";

const CadastroClinica = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    descricao: "",
    cnpj: "",
    endereco: "",
    telefone: "",
    email: "",
  });

  const [profissionais, setProfissionais] = useState([]);
  const [exames, setExames] = useState([]);
  const [todosProfissionais, setTodosProfissionais] = useState([]);
  const [filtroProfissional, setFiltroProfissional] = useState("");
  const [isProfissionaisModalOpen, setIsProfissionaisModalOpen] = useState(false);
  const [isExamesModalOpen, setIsExamesModalOpen] = useState(false);
  const [novoExame, setNovoExame] = useState({
    tipo: "",
    descricao: "",
    id_clinica: id || "",
    valor: "",
    preparo: "",
    observacoes: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/clinicas/${id}`).then(response => {
        setForm(response.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNovoExameChange = (e) => {
    setNovoExame({ ...novoExame, [e.target.name]: e.target.value });
  };

  const adicionarProfissional = (profissional) => {
    setProfissionais([...profissionais, profissional]);
    setIsProfissionaisModalOpen(false);
  };

  const adicionarExame = () => {
    setExames([...exames, novoExame]);
    setIsExamesModalOpen(false);
    setNovoExame({ tipo: "", descricao: "", id_clinica: id || "", valor: "", preparo: "", observacoes: "" });
  };

  return (
    <div className="flex flex-col flex-1 p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">{id ? "Editar Clínica" : "Cadastro de Clínica"}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Dados da Clínica</h2>
          <form>
            <Input label="Nome" name="descricao" value={form.descricao} onChange={handleChange} required />
            <Input label="CNPJ" name="cnpj" value={form.cnpj} onChange={handleChange} required />
            <Input label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} required />
            <Input label="E-mail" name="email" value={form.email} onChange={handleChange} type="email" required />
            <Input label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} required />
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Profissionais Vinculados</h2>
          <Botao texto="Adicionar Profissional" onClick={() => setIsProfissionaisModalOpen(true)} icon={<MdAdd />} />
          <Tabela headers={["Nome", "Especialidade"]} data={profissionais.map(p => [p.nome, p.especialidade])} />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Exames Disponíveis</h2>
        <Botao texto="Adicionar Exame/Procedimento" onClick={() => setIsExamesModalOpen(true)} icon={<MdAdd />} />
        <Tabela headers={["Descrição", "Valor"]} data={exames.map(e => [e.descricao, e.valor])} />
      </div>

      {isProfissionaisModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Selecionar Profissional</h3>
            <Input label="Filtrar por Nome ou Especialidade" value={filtroProfissional} onChange={(e) => setFiltroProfissional(e.target.value)} />
            <Tabela headers={["Nome", "Especialidade", "Ação"]} data={
              todosProfissionais.map(p => ([
                p.nome,
                p.especialidade,
                <button onClick={() => adicionarProfissional(p)}>Selecionar</button>
              ]))
            } />
            <Botao texto="Fechar" onClick={() => setIsProfissionaisModalOpen(false)} />
          </div>
        </div>
      )}

      {isExamesModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Adicionar Exame/Procedimento</h3>
            <Input label="Tipo" name="tipo" value={novoExame.tipo} onChange={handleNovoExameChange} />
            <Input label="Descrição" name="descricao" value={novoExame.descricao} onChange={handleNovoExameChange} />
            <Input label="Valor" name="valor" value={novoExame.valor} onChange={handleNovoExameChange} />
            <Input label="Preparo" name="preparo" value={novoExame.preparo} onChange={handleNovoExameChange} />
            <Input label="Observações" name="observacoes" value={novoExame.observacoes} onChange={handleNovoExameChange} />
            <Botao texto="Adicionar" onClick={adicionarExame} />
            <Botao texto="Fechar" onClick={() => setIsExamesModalOpen(false)} tipo="secundario" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CadastroClinica;
