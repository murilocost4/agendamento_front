import React from "react";
import { Link, useLocation } from "react-router-dom"; // Importando useLocation
import { FaHome, FaUser, FaHospital, FaCalendarAlt } from "react-icons/fa"; // Exemplos de ícones

const NavButton = ({ icon, text, to }) => {
  const location = useLocation(); // Obtendo a localização atual da URL

  // Verificando se a URL começa com o valor da rota desejada (ex: /pacientes ou /cadastro-paciente)
  const isActive = location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-md text-lg font-medium ${
        isActive
          ? "bg-white text-gray-700 shadow-md hover:brightness-95"
          : "text-gray-600 hover:bg-slate-300"
      } transition-all duration-200 mt-2 w-52 ml-2 mr-2`}
    >
      <div className="mr-2">{icon}</div>
      {text}
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4 shadow-md fixed z-10 mt-20">
      <div className="flex flex-col items-start space-y-6">
        <div className="flex flex-col items-start mt-8">
          <NavButton to="/dashboard" icon={<FaHome />} text="Dashboard" />
          <NavButton to="/pacientes" icon={<FaUser />} text="Pacientes" />
          <NavButton to="/profissionais" icon={<FaUser />} text="Profissionais" />
          <NavButton to="/clinicas" icon={<FaHospital />} text="Clínicas" />
          <NavButton to="/agendamentos" icon={<FaCalendarAlt />} text="Agendamentos" />
          {/* Novo botão de Rede de Convênios */}
          <NavButton to="/rede-convenios" icon={<FaHospital />} text="Rede de Convênios" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
