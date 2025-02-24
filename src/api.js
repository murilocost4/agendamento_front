// src/api/api.js
const API_URL = "http://localhost:5000/api"; // URL do backend Flask

// Função para fazer a requisição de busca de conveniados
export const buscarConvenios = async (filtros) => {
  try {
    const response = await fetch(`${API_URL}/busca`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtros),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar dados");
    }

    const data = await response.json();
    return data; // Retorna os dados filtrados
  } catch (error) {
    console.error("Erro ao buscar conveniados:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para criar um novo paciente
export const criarPaciente = async (dadosPaciente) => {
  try {
    const response = await fetch(`${API_URL}/pacientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosPaciente),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar paciente");
    }

    const data = await response.json();
    return data; // Retorna o paciente criado
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para obter todos os pacientes
export const obterPacientes = async () => {
  try {
    const response = await fetch(`${API_URL}/pacientes`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter pacientes");
    }

    const data = await response.json();
    return data; // Retorna a lista de pacientes
  } catch (error) {
    console.error("Erro ao obter pacientes:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para obter um paciente específico
export const obterPaciente = async (id) => {
  try {
    const response = await fetch(`${API_URL}/pacientes/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter paciente");
    }

    const data = await response.json();
    return data; // Retorna os dados do paciente
  } catch (error) {
    console.error("Erro ao obter paciente:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para atualizar um paciente
export const atualizarPaciente = async (id, dadosAtualizados) => {
  try {
    const response = await fetch(`${API_URL}/pacientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosAtualizados),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar paciente");
    }

    const data = await response.json();
    return data; // Retorna o paciente atualizado
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para deletar um paciente
export const excluirPaciente = async (id) => {
  try {
    const response = await fetch(`${API_URL}/pacientes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar paciente");
    }

    const data = await response.json();
    return data; // Retorna a mensagem de sucesso
  } catch (error) {
    console.error("Erro ao deletar paciente:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// === Rotas de Profissionais ===

// Função para criar um novo profissional
export const criarProfissional = async (dadosProfissional) => {
  try {
    const response = await fetch(`${API_URL}/profissionais`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosProfissional),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar profissional");
    }

    const data = await response.json();
    return data; // Retorna o profissional criado
  } catch (error) {
    console.error("Erro ao criar profissional:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para obter todos os profissionais
export const obterProfissionais = async () => {
  try {
    const response = await fetch(`${API_URL}/profissionais`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter profissionais");
    }

    const data = await response.json();
    return data; // Retorna a lista de profissionais
  } catch (error) {
    console.error("Erro ao obter profissionais:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para obter um profissional específico
export const obterProfissional = async (id) => {
  try {
    const response = await fetch(`${API_URL}/profissionais/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter profissional");
    }

    const data = await response.json();
    return data; // Retorna os dados do profissional
  } catch (error) {
    console.error("Erro ao obter profissional:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para atualizar um profissional
export const atualizarProfissional = async (id, dadosAtualizados) => {
  try {
    const response = await fetch(`${API_URL}/profissionais/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosAtualizados),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar profissional");
    }

    const data = await response.json();
    return data; // Retorna o profissional atualizado
  } catch (error) {
    console.error("Erro ao atualizar profissional:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para deletar um profissional
export const excluirProfissional = async (id) => {
  try {
    const response = await fetch(`${API_URL}/profissionais/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar profissional");
    }

    const data = await response.json();
    return data; // Retorna a mensagem de sucesso
  } catch (error) {
    console.error("Erro ao deletar profissional:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// === Rotas de Especialidades ===

// Função para criar uma nova especialidade
export const criarEspecialidade = async (dadosEspecialidade) => {
    try {
      const response = await fetch(`${API_URL}/especialidades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosEspecialidade),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao criar especialidade");
      }
  
      const data = await response.json();
      return data; // Retorna a especialidade criada
    } catch (error) {
      console.error("Erro ao criar especialidade:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
  // Função para obter todas as especialidades
  export const obterEspecialidades = async () => {
    try {
      const response = await fetch(`${API_URL}/especialidades`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao obter especialidades");
      }
  
      const data = await response.json();
      return data; // Retorna a lista de especialidades
    } catch (error) {
      console.error("Erro ao obter especialidades:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
  // Função para obter uma especialidade específica
  export const obterEspecialidade = async (id) => {
    try {
      const response = await fetch(`${API_URL}/especialidades/${id}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao obter especialidade");
      }
  
      const data = await response.json();
      return data; // Retorna os dados da especialidade
    } catch (error) {
      console.error("Erro ao obter especialidade:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
  // Função para atualizar uma especialidade
  export const atualizarEspecialidade = async (id, dadosAtualizados) => {
    try {
      const response = await fetch(`${API_URL}/especialidades/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAtualizados),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar especialidade");
      }
  
      const data = await response.json();
      return data; // Retorna a especialidade atualizada
    } catch (error) {
      console.error("Erro ao atualizar especialidade:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
  // Função para deletar uma especialidade
  export const excluirEspecialidade = async (id) => {
    try {
      const response = await fetch(`${API_URL}/especialidades/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao deletar especialidade");
      }
  
      const data = await response.json();
      return data; // Retorna a mensagem de sucesso
    } catch (error) {
      console.error("Erro ao deletar especialidade:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
// === Rotas de Serviços ===

// Função para criar um novo serviço
export const criarServico = async (dadosServico) => {
    try {
      const response = await fetch(`${API_URL}/servicos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosServico),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao criar serviço");
      }
  
      const data = await response.json();
      return data; // Retorna o serviço criado
    } catch (error) {
      console.error("Erro ao criar serviço:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
  // Função para obter todos os serviços
  export const obterServicos = async () => {
    try {
      const response = await fetch(`${API_URL}/servicos`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao obter serviços");
      }
  
      const data = await response.json();
      return data; // Retorna a lista de serviços
    } catch (error) {
      console.error("Erro ao obter serviços:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
  // Função para obter um serviço específico
  export const obterServico = async (id) => {
    try {
      const response = await fetch(`${API_URL}/servicos/${id}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao obter serviço");
      }
  
      const data = await response.json();
      return data; // Retorna os dados do serviço
    } catch (error) {
      console.error("Erro ao obter serviço:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
  // Função para atualizar um serviço
  export const atualizarServico = async (id, dadosAtualizados) => {
    try {
      const response = await fetch(`${API_URL}/servicos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAtualizados),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar serviço");
      }
  
      const data = await response.json();
      return data; // Retorna o serviço atualizado
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
  // Função para deletar um serviço
  export const excluirServico = async (id) => {
    try {
      const response = await fetch(`${API_URL}/servicos/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao deletar serviço");
      }
  
      const data = await response.json();
      return data; // Retorna a mensagem de sucesso
    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
  // Função para buscar serviços por profissional
export const buscarServicosPorProfissional = async (idProfissional) => {
    try {
      const response = await fetch(`${API_URL}/servicos/profissional/${idProfissional}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao obter serviços do profissional");
      }
  
      const data = await response.json();
      return data; // Retorna os serviços do profissional
    } catch (error) {
      console.error("Erro ao buscar serviços do profissional:", error);
      throw error; // Retorna o erro para ser tratado no componente
    }
  };
  
  // Função para criar uma nova clínica
export const criarClinica = async (dadosClinica) => {
  try {
    const response = await fetch(`${API_URL}/clinicas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosClinica),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar clínica");
    }

    const data = await response.json();
    return data; // Retorna a clínica criada
  } catch (error) {
    console.error("Erro ao criar clínica:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para obter todas as clínicas
export const obterClinicas = async () => {
  try {
    const response = await fetch(`${API_URL}/clinicas`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter clínicas");
    }

    const data = await response.json();
    return data; // Retorna a lista de clínicas
  } catch (error) {
    console.error("Erro ao obter clínicas:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para obter uma clínica específica
export const obterClinica = async (id) => {
  try {
    const response = await fetch(`${API_URL}/clinicas/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erro ao obter clínica");
    }

    const data = await response.json();
    return data; // Retorna os dados da clínica
  } catch (error) {
    console.error("Erro ao obter clínica:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para atualizar uma clínica
export const atualizarClinica = async (id, dadosAtualizados) => {
  try {
    const response = await fetch(`${API_URL}/clinicas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosAtualizados),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar clínica");
    }

    const data = await response.json();
    return data; // Retorna a clínica atualizada
  } catch (error) {
    console.error("Erro ao atualizar clínica:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};

// Função para deletar uma clínica
export const excluirClinica = async (id) => {
  try {
    const response = await fetch(`${API_URL}/clinicas/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar clínica");
    }

    const data = await response.json();
    return data; // Retorna a mensagem de sucesso
  } catch (error) {
    console.error("Erro ao deletar clínica:", error);
    throw error; // Retorna o erro para ser tratado no componente
  }
};