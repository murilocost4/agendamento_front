import React from 'react';

const ModalConfirmacao = ({ isOpen, onClose, onConfirm, pacienteNome }) => {
  if (!isOpen) return null; // Não exibe o modal se isOpen for falso

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
        <p>Você tem certeza que deseja excluir o paciente "{pacienteNome}"?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;
