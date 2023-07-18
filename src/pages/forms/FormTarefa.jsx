import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import Fetch from '../../providers/Fetch';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import InputColor from '../../components/InputColor';
import 'react-toastify/dist/ReactToastify.css';
import InputSelect from '../../components/InputSelect';

const FormTarefa = () => {
    const history = useHistory();
    const location = useLocation();
    const state = location?.state || {};

    const [formulario, setFormulario] = useState({
        id: 0,
        nome: '',
        responsavelId: 0,
        nomeCard: '',
        cardId: 0,
        corCard: '',
        posicaoCard: 0,
        colaboradoresDisponiveis: [],
        loading: false,
    });

    const [erros, setErros] = useState({
        erroNome: false,
        erroNomeCard: false,
        erroCorCard: false,
        erroResponsavel: false,
    })

    const {
        id,
        nome,
        responsavelId,
        nomeCard,
        cardId,
        corCard,
        posicaoCard,
        colaboradoresDisponiveis,
        loading
    } = formulario;

    const {
        erroNome,
        erroNomeCard,
        erroCorCard,
        erroResponsavel,
    } = erros;

    useEffect(() => {
        var itens = [{ value: 0, label: 'Selecione' }];
        setFormulario((prevState) => ({
            ...prevState,
            loading: true,
        }));

        Fetch.get('/colaborador')
            .then(({ data }) => {
                data.map((colaborador) => {
                    itens.push({ value: colaborador.id, label: colaborador.nome });
                });

                setFormulario((prevState) => ({
                    ...prevState,
                    colaboradoresDisponiveis: itens,
                }));
            })
            .catch(() => {
                toast.error('Não foi possível carregar os colaboradores disponíveis!');
            })
            .finally(() => {
                setFormulario((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
            });
    }, []);

    useEffect(() => {
        if (state.id) {
            setFormulario((prevState) => ({
                ...prevState,
                loading: true,
            }));

            Fetch.get(`/tarefa/${state.id}`)
                .then(({ data }) => {
                    preencherFormulario(data);
                })
                .catch(() => {
                    toast.error('Falha ao tentar carregar as informações!');
                })
                .finally(() => {
                    setFormulario((prevState) => ({
                        ...prevState,
                        loading: false,
                    }));
                });
        }
    }, [id]);

    useEffect(() => {
        validarFormulario();
    }, [nome, nomeCard, corCard, responsavelId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            setFormulario((prevState) => ({
                ...prevState,
                loading: true,
            }));

            const payload = {
                id,
                nome,
                cardId: cardId || 0,
                responsavelId,
                card: {
                    id: cardId || 0,
                    nome: nomeCard,
                    cor: corCard,
                    posicao: posicaoCard,
                },
            };

            Fetch.post('/tarefa', payload)
                .then(() => {
                    history.goBack();
                })
                .catch((err) => {
                    toast.error('Falha ao tentar salvar a tarefa!');
                })
                .finally(() => {
                    setFormulario((prevState) => ({
                        ...prevState,
                        loading: false,
                    }));
                });
        }
    };

    const handleCancelar = () => {
        limparFormulario();
        history.goBack();
    };

    const preencherFormulario = (data) => {
        setFormulario((prevState) => ({
            ...prevState,
            id: data?.id,
            nome: data?.nome,
            responsavelId: data?.responsavelId,
            nomeCard: data?.card?.nome,
            cardId: data?.card?.id,
            corCard: data?.card?.cor,
            posicaoCard: data?.card?.posicao,
        }));
    };

    const limparFormulario = () => {
        setFormulario((prevState) => ({
            ...prevState,
            nome: '',
            cardId: null,
            responsavelId: null,
        }));

        setErros((prevState) => ({
            ...prevState,
            erroNome: false,
            erroNomeCard: false,
            erroCorCard: false,
            erroResponsavel: false,
        }))
    };

    const validarFormulario = () => {
        let valido = true;

        if (nome.trim() === '') {
            setErros((prevState) => ({
                ...prevState,
                erroNome: true,
            }));
            valido = false;
        } else {
            setErros((prevState) => ({
                ...prevState,
                erroNome: false,
            }));
        }

        if (nomeCard.trim() === '') {
            setErros((prevState) => ({
                ...prevState,
                erroNomeCard: true,
            }));
            valido = false;
        } else {
            setErros((prevState) => ({
                ...prevState,
                erroNomeCard: false,
            }));
        }

        if (corCard.trim() === '') {
            setErros((prevState) => ({
                ...prevState,
                erroCorCard: true,
            }));
            valido = false;
        } else {
            setErros((prevState) => ({
                ...prevState,
                erroCorCard: false,
            }));
        }

        if (responsavelId == 0) {
            setErros((prevState) => ({
                ...prevState,
                erroResponsavel: true,
            }));
            valido = false;
        } else {
            setErros((prevState) => ({
                ...prevState,
                erroResponsavel: false,
            }));
        }

        return valido;
    };

    return (
        <Container className="mt-5">
            <Loading loading={loading} />
            <h2>Cadastro de Tarefa</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Input
                            type="text"
                            id="nome"
                            label={'Nome'}
                            value={nome}
                            onChange={(e) => setFormulario((prevState) => ({ ...prevState, nome: e.target.value }))}
                            erro={erroNome}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <InputSelect
                            id="responsavel"
                            label="Responsavel"
                            value={responsavelId}
                            options={colaboradoresDisponiveis}
                            onChange={(e) => setFormulario((prevState) => ({ ...prevState, responsavelId: e.target.value }))}
                            erro={erroResponsavel}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={8}>
                        <Input
                            type="text"
                            id="nome"
                            label="Nome do Card"
                            value={nomeCard}
                            onChange={(e) => setFormulario((prevState) => ({ ...prevState, nomeCard: e.target.value }))}
                            disabled={cardId}
                            erro={erroNomeCard}
                        />
                    </Col>
                    <Col md={4}>
                        <InputColor
                            type="text"
                            id="cor"
                            label="Cor do Card"
                            value={corCard}
                            onChange={(e) => setFormulario((prevState) => ({ ...prevState, corCard: e }))}
                            disabled={cardId}
                            erro={erroCorCard}
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleCancelar}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" className="ms-2">
                            Salvar
                        </Button>
                    </Col>
                </Row>
            </Form>
            <ToastContainer />
        </Container>
    );
};

export default FormTarefa;
