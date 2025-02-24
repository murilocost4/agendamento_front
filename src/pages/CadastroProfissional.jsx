import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Botao from "../components/botao";
import Tabela from "../components/tabela";
import { useParams } from "react-router-dom";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import {
  obterEspecialidades,
  obterProfissional,
  criarProfissional,
  atualizarServico,
  excluirServico,
  buscarServicosPorProfissional,
} from "../api";

const CadastroProfissional = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: "",
    id_especialidade: "",
    registro_profissional: "",
    telefone: "",
    email: "",
    endereco: "",
  });

  const [especialidades, setEspecialidades] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingServico, setEditingServico] = useState(null);
  const [deletingServico, setDeletingServico] = useState(null);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const especialidadesData = await obterEspecialidades();
        setEspecialidades(especialidadesData);
      } catch (error) {
        console.error("Erro ao buscar especialidades:", error);
      }
    };
    fetchEspecialidades();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchProfissional = async () => {
        try {
          const profissionalData = await obterProfissional(id);
          setForm({
            nome: profissionalData.nome,
            id_especialidade: profissionalData.id_especialidade,
            registro_profissional: profissionalData.registro_profissional,
            telefone: profissionalData.telefone,
            email: profissionalData.email,
            endereco: profissionalData.endereco,
          });
        } catch (error) {
          console.error("Erro ao buscar profissional:", error);
        }
      };
      fetchProfissional();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        console.log("Atualizar Profissional:", form);
      } else {
        const profissional = await criarProfissional(form);
        console.log("Profissional cadastrado:", profissional);
      }
    } catch (error) {
      console.error("Erro ao salvar profissional:", error);
    }
  };

  return (
    <div className="flex flex-col flex-1 p-6 w-full space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Cadastro de Profissional</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <h2 className="text-xl font-semibold">Dados Pessoais</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nome" name="nome" value={form.nome} onChange={handleChange} required />
            <div>
              <label className="block text-sm font-medium text-gray-700">Especialidade</label>
              <select name="id_especialidade" value={form.id_especialidade} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm" required>
                <option value="">Selecione uma especialidade</option>
                {especialidades.map((especialidade) => (
                  <option key={especialidade.id} value={especialidade.id}>{especialidade.nome_especialidade}</option>
                ))}
              </select>
            </div>
            <Input label="Registro Profissional" name="registro_profissional" value={form.registro_profissional} onChange={handleChange} required />
            <Input label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} mask="(99) 99999-9999" required />
            <Input label="E-mail" name="email" value={form.email} onChange={handleChange} type="email" required />
            <Input label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} required />
            <div className="mt-4">
              <Botao texto={id ? "Atualizar Profissional" : "Cadastrar Profissional"} tipo="submit" />
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <h2 className="text-xl font-semibold">Serviços</h2>
          <Tabela
            headers={["Descrição", "Local", "Valor"]}
            data={servicos.map((servico) => ({
              descricao: servico.descricao,
              local: servico.local,
              valor: servico.valor,
              servico,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default CadastroProfissional;
