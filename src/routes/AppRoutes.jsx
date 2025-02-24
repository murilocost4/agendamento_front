import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Pacientes from "../pages/Pacientes";
import Profissionais from "../pages/Profissionais";
import Clinicas from "../pages/Clinicas";
import Agendamentos from "../pages/Agendamentos";
import CadastroPaciente from "../pages/CadastroPaciente";
import CadastroProfissional from "../pages/CadastroProfissional";
import CadastroClinica from "../pages/CadastroClinica";
import CadastroAgendamento from "../pages/CadastroAgendamento";
import RedeConvenios from "../pages/RedeConvenios";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pacientes" element={<Pacientes />} />
      <Route path="/profissionais" element={<Profissionais />} />
      <Route path="/clinicas" element={<Clinicas />} />
      <Route path="/agendamentos" element={<Agendamentos />} />
      <Route path="/pacientes-cadastro" element={<CadastroPaciente />} />
      <Route path="/pacientes-cadastro/:id" element={<CadastroPaciente />} />
      <Route path="/profissionais-cadastro" element={<CadastroProfissional />} />
      <Route path="/profissionais-cadastro/:id" element={<CadastroProfissional />} />
      <Route path="/clinicas-cadastro" element={<CadastroClinica />} />
      <Route path="/clinicas-cadastro/:id" element={<CadastroClinica />} />
      <Route path="/agendamentos-cadastro" element={<CadastroAgendamento />} />
      <Route path="/agendamentos-cadastro/:id" element={<CadastroAgendamento />} />
      <Route path="/rede-convenios" element={<RedeConvenios />} />

    </Routes>
  );
};

export default AppRoutes;
