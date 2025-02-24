import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Botao from "../components/botao";
import { useParams } from "react-router-dom";

// Dados simulados para pacientes, serviços, profissionais e clínicas
const pacientes = [
  { id: 1, nome: "Carlos Almeida" },
  { id: 2, nome: "Maria Oliveira" },
];

const serviços = [
  { id: 1, nome: "Consulta Cardiológica", valor: 200 },
  { id: 2, nome: "Consulta Dermatológica", valor: 150 },
];

const profissionais = [
  { id: 1, nome: "Dr. João Silva" },
  { id: 2, nome: "Dra. Ana Souza" },
];

const clinicas = [
  { id: 1, nome: "Clínica Saúde Total" },
  { id: 2, nome: "Clínica Vida Plena" },
];

const CadastroAgendamento = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    id_solicitante: "",
    id_paciente: "",
    id_servico: "",
    id_profissional: "",
    id_clinica: "",
    data_solicitacao: "", // A data e hora da solicitação
    data_agendamento: "", // Data do agendamento
    horario: "",
    valor: "",
    status: "Pendente", // Status do agendamento
  });

  const statusOptions = ["Confirmado", "Pendente", "Cancelado"];

  useEffect(() => {
    if (id) {
      // Aqui você pode buscar os dados do agendamento via API
      // Exemplo de busca: fetch(`/api/agendamentos/${id}`).then((response) => response.json()).then((data) => setForm(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "id_servico" && { valor: serviços.find((s) => s.id === parseInt(value))?.valor || "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Agendamento salvo:", form);
    // Você pode fazer uma requisição para salvar o agendamento no banco de dados aqui
  };

  return (
    <div className="flex flex-col flex-1 p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Editar Agendamento" : "Novo Agendamento"}
      </h1>

      {/* Formulário de cadastro de agendamento */}
      <form onSubmit={handleSubmit}>
        {/* Dados do Agendamento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Dados do Agendamento</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Data e Hora de Solicitação */}
              <Input
                label="Data da Solicitação"
                name="data_solicitacao"
                type="datetime-local"
                value={form.data_solicitacao}
                onChange={handleChange}
                required
              />

              {/* Solicitação (Paciente ou Profissional) */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Solicitante</label>
                <select
                  name="id_solicitante"
                  value={form.id_solicitante}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione</option>
                  <option value="paciente">Paciente</option>
                  <option value="profissional">Profissional</option>
                </select>
              </div>

              {/* Paciente */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Paciente</label>
                <select
                  name="id_paciente"
                  value={form.id_paciente}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione</option>
                  {pacientes.map((paciente) => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Serviço */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Serviço</label>
                <select
                  name="id_servico"
                  value={form.id_servico}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione</option>
                  {serviços.map((servico) => (
                    <option key={servico.id} value={servico.id}>
                      {servico.nome} - {servico.valor}
                    </option>
                  ))}
                </select>
              </div>

              {/* Profissional */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Profissional</label>
                <select
                  name="id_profissional"
                  value={form.id_profissional}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione</option>
                  {profissionais.map((prof) => (
                    <option key={prof.id} value={prof.id}>
                      {prof.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clínica */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Clínica</label>
                <select
                  name="id_clinica"
                  value={form.id_clinica}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione</option>
                  {clinicas.map((clinica) => (
                    <option key={clinica.id} value={clinica.id}>
                      {clinica.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Data do Agendamento */}
              <Input
                label="Data do Agendamento"
                name="data_agendamento"
                type="date"
                value={form.data_agendamento}
                onChange={handleChange}
                required
              />

              <Input
                label="Horário"
                name="horario"
                type="time"
                value={form.horario}
                onChange={handleChange}
                required
              />

              {/* Valor */}
              <Input
                label="Valor"
                name="valor"
                type="number"
                value={form.valor}
                onChange={handleChange}
                required
              />

              {/* Status */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                >
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botão de Submissão */}
            <div className="mt-6">
              <Botao texto={id ? "Salvar Alterações" : "Cadastrar Agendamento"} tipo="submit" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CadastroAgendamento;
