import { get } from "lodash";
import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import { posicoes } from "../static/posicoes";

const TableView = ({ colunas, itens, acaoExcluir, acaoEditar }) => {
    const [showModal, setShowModal] = useState(false);
    const [itemId, setItemId] = useState(null);

    const handleExcluir = (id) => {
        setShowModal(true);
        setItemId(id);
    };

    const handleConfirmarExclusao = () => {
        acaoExcluir(itemId);
        setShowModal(false);
        setItemId(null);
    };

    const handleFecharModal = () => {
        setShowModal(false);
        setItemId(null);
    };

    const renderizarCampo = (item, coluna) => {
        const campo = coluna.campo;

        if (campo === 'posicao') {
            const posicao = posicoes[get(item, campo)];
            return posicao ? posicao.name : '';
        }

        if (campo === 'situacao') {
            return item[campo] ? 'Ativo' : 'Inativo';
        }

        return get(item, campo);
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {colunas.map((coluna, index) => (
                            <th key={index}>{coluna.nome}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {itens.map((item) => (
                        <tr key={item.id}>
                            {colunas.map((coluna, index) => (
                                <td key={index}>
                                    {renderizarCampo(item, coluna)}
                                </td>
                            ))}
                            <td className="col-md-4 text-center justify-content-between">
                                <Button variant="success" onClick={() => acaoEditar(item.id)}>
                                    <PencilFill /> Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleExcluir(item.id)}>
                                    <TrashFill /> Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleFecharModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente excluir o item selecionado?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleFecharModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmarExclusao}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TableView;