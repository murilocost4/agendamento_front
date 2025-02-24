import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Botao from "../components/botao";
import Tabela from "../components/tabela"; // Componente de tabela reutilizável
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Importando axios para fazer requisições HTTP

const CadastroPaciente = () => {
  const { id } = useParams(); // Pegando o id do paciente da URL (para edição)
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };
  
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    telefone: "",
    email: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado_civil: "solteiro", // Valor padrão
    profissao: "",
  });

  const [registro, setRegistro] = useState([
    { rowData: ["01/01/2023", "Plano Ouro", "Ativo"], id: 1 },
    { rowData: ["10/05/2023", "Plano Prata", "Ativo"], id: 2 },
  ]);

  const headers = ["Data", "Plano", "Status"]; // Cabeçalhos da tabela de registros

  // Carregar paciente para edição (se id for encontrado)
  useEffect(() => {
    if (id) {
      // Chamada para a API para obter os dados do paciente
      axios.get(`http://localhost:5000/api/pacientes/${id}`)
        .then(response => {
          const pacienteEditado = response.data;
          const formattedDate = pacienteEditado.data_nascimento.split('-').reverse().join('/');
          setForm({ ...pacienteEditado, data_nascimento: formattedDate });
        })
        .catch(error => {
          console.error("Erro ao carregar os dados do paciente", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = formatDate(form.data_nascimento);

    const pacienteData = { ...form, data_nascimento: formattedDate };

    // Se o id existir, significa que estamos editando um paciente
    if (id) {
      // Atualizando o paciente na API
      axios.put(`http://localhost:5000/api/pacientes/${id}`, pacienteData)
        .then(response => {
            alert("Paciente editado com sucesso!");
            navigate("/pacientes");
        })
        .catch(error => {
            console.error("Erro ao editar o paciente", error);
            alert("Erro ao editar o paciente.");
        });
    } else {
      // Caso contrário, estamos cadastrando um novo paciente
      axios.post("http://localhost:5000/api/pacientes", pacienteData)
        .then(response => {
          alert("Paciente cadastrado com sucesso!");
          setRegistro([
            ...registro,
            { rowData: [new Date().toLocaleDateString(), "Plano Ouro", "Ativo"], id: registro.length + 1 },
          ]);
          navigate("/pacientes");
        })
        .catch(error => {
          console.error("Erro ao cadastrar paciente", error);
          alert("Erro ao cadastrar paciente.");
        });
    }
  };

  return (
    <div className="flex flex-col flex-1 p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">{id ? "Editar Paciente" : "Cadastro de Paciente"}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Primeira Seção: Dados Pessoais e Cadastrais */}
        <div className="flex flex-col space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Dados Pessoais e Cadastrais</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nome */}
              <Input
                label="Nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                className="sm:col-span-2"
              />

              {/* CPF */}
              <Input
                label="CPF"
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                mask="999.999.999-99"
                required
              />

              {/* Data de Nascimento */}
              <Input
                label="Data de Nascimento"
                name="data_nascimento"
                value={form.data_nascimento}
                onChange={handleChange}
                mask="99/99/9999"
                required
              />

              {/* Telefone */}
              <Input
                label="Telefone"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                mask="(99) 99999-9999"
                required
              />

              {/* E-mail */}
              <Input
                label="E-mail"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                className="sm:col-span-2"
              />

              {/* Endereço */}
              <Input
                label="Endereço"
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
                required
                className="sm:col-span-2"
              />

              {/* Número */}
              <Input
                label="Número"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                required
              />

              {/* Bairro */}
              <Input
                label="Bairro"
                name="bairro"
                value={form.bairro}
                onChange={handleChange}
                required
              />

              {/* Cidade */}
              <Input
                label="Cidade"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                required
              />

              {/* Estado Civil */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Estado Civil
                </label>
                <select
                  name="estado_civil"
                  value={form.estado_civil}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="solteiro">Solteiro(a)</option>
                  <option value="casado">Casado(a)</option>
                  <option value="divorciado">Divorciado(a)</option>
                  <option value="viúvo">Viúvo(a)</option>
                </select>
              </div>

              {/* Profissão */}
              <Input
                label="Profissão"
                name="profissao"
                value={form.profissao}
                onChange={handleChange}
                required
                className="sm:col-span-2"
              />
            </div>

            {/* Botão de Submissão */}
            <div className="mt-6">
              <Botao texto={id ? "Salvar Alterações" : "Cadastrar Paciente"} tipo="submit" />
            </div>
          </form>
        </div>

        {/* Segunda Seção: Registro */}
        <div className="flex flex-col space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Registros</h2>
          {/* Tabela de Registros */}
          <Tabela headers={headers} data={registro} />
        </div>
      </div>
    </div>
  );
};

export default CadastroPaciente;
