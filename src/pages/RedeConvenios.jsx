import React, { useState } from "react";
import { FaSearch, FaBuilding, FaStethoscope, FaMapMarkerAlt, FaFileMedical } from "react-icons/fa";

const RedeConvenios = () => {
  const [filters, setFilters] = useState({
    profissional: "",
    especialidade: "",
    clinica: "",
    exame: "",
    cidade: "",
  });

  const especialidades = ["Cardiologia", "Neurologia", "Pediatria", "Ortopedia"];
  const cidades = ["Taquari", "Porto Alegre", "São Paulo", "Rio de Janeiro"];
  const clinicas = ["Clínica São José", "Clínica Vida", "Clínica Saúde", "Clínica Medcenter"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os filtros para o backend
    console.log("Busca com os filtros: ", filters);
  };

  return (
    <div className="w-full h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6">Rede de Convênios</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-semibold mb-4">Buscar na Rede de Convênios</h2>

        {/* Menu de Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Filtro de Profissional */}
          <div className="flex flex-col">
            <label htmlFor="profissional" className="text-sm font-medium text-gray-700">
              Profissional
            </label>
            <input
              type="text"
              id="profissional"
              name="profissional"
              value={filters.profissional}
              onChange={handleChange}
              placeholder="Ex: Dr. João"
              className="mt-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Filtro de Especialidade */}
          <div className="flex flex-col">
            <label htmlFor="especialidade" className="text-sm font-medium text-gray-700">
              Especialidade
            </label>
            <select
              id="especialidade"
              name="especialidade"
              value={filters.especialidade}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Selecione...</option>
              {especialidades.map((especialidade, index) => (
                <option key={index} value={especialidade}>
                  {especialidade}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Clínica */}
          <div className="flex flex-col">
            <label htmlFor="clinica" className="text-sm font-medium text-gray-700">
              Clínica
            </label>
            <select
              id="clinica"
              name="clinica"
              value={filters.clinica}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Selecione...</option>
              {clinicas.map((clinica, index) => (
                <option key={index} value={clinica}>
                  {clinica}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Exame */}
          <div className="flex flex-col">
            <label htmlFor="exame" className="text-sm font-medium text-gray-700">
              Exame
            </label>
            <input
              type="text"
              id="exame"
              name="exame"
              value={filters.exame}
              onChange={handleChange}
              placeholder="Ex: Ultrassom"
              className="mt-2 p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Filtro de Cidade */}
          <div className="flex flex-col">
            <label htmlFor="cidade" className="text-sm font-medium text-gray-700">
              Cidade
            </label>
            <select
              id="cidade"
              name="cidade"
              value={filters.cidade}
              onChange={handleChange}
              className="mt-2 p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Selecione...</option>
              {cidades.map((cidade, index) => (
                <option key={index} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botão de Busca */}
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 w-full sm:w-56 mx-auto mt-6"
        >
          <FaSearch className="mr-2" />
          Buscar
        </button>
      </form>

      {/* Resultados da Busca (Futuramente, após integrar com o backend) */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Resultados</h2>
        {/* A partir daqui, você pode mapear os resultados da pesquisa após integração com o backend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg">Profissional: Dr. João</h3>
            <p>Especialidade: Cardiologia</p>
            <p>Clínica: Clínica São José</p>
          </div>
          {/* Aqui outros resultados */}
        </div>
      </div>
    </div>
  );
};

export default RedeConvenios;
