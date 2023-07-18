import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Fetch from '../../providers/Fetch';
import Loading from '../../components/Loading';
import HeaderView from '../../components/HeaderView';
import TableView from '../../components/TableView';
import routes from '../../static/routesconfig';

const ViewTarefa = () => {
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const colunas = [
        {
            nome: 'Nome',
            campo: 'nome'
        },
        {
            nome: 'Card',
            campo: 'card.nome'
        }
    ]

    useEffect(() => {
        setLoading(true);
        Fetch.get('/tarefa')
            .then(({ data }) => {
                setItens(data);
            })
            .catch(() => {
                toast.error('Falha ao carregar os registros!');
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    const adicionarItem = () => {
        history.push(routes.FORM_TAREFA);
    };

    const excluirItem = (id) => {
        setLoading(true);
        Fetch.delete(`/tarefa/${id}`)
            .then(() => {
                toast.success('Item excluído com sucesso!');
                setItens(itens.filter(item => item.id != id));
            })
            .catch(() => {
                toast.error('Falha excluir o registro!');
            }).finally(() => {
                setLoading(false);
            });
    };

    const editarItem = (id) => {
        history.push(routes.FORM_TAREFA, { id });
    };

    return (
        <Container fluid>
            <Loading loading={loading} />
            <HeaderView titulo={'Tarefas'} adicionar={adicionarItem} />

            <TableView colunas={colunas} itens={itens} acaoExcluir={excluirItem} acaoEditar={editarItem} />

            <ToastContainer />
        </Container>
    );
};

export default ViewTarefa;
