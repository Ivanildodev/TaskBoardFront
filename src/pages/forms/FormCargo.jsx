import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import Fetch from '../../providers/Fetch';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import InputSelect from '../../components/InputSelect';
import 'react-toastify/dist/ReactToastify.css';
import { situacoes } from '../../static/situacoes';

const FormCargo = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = location?.state || {};

  const [formulario, setFormulario] = useState({
    nome: '',
    descricao: '',
    situacao: true,
    loading: false
  });

  const [erros, setErros] = useState({
    erroNome: false,
    erroDescricao: false,
  });

  const { nome, descricao, situacao, loading } = formulario;

  const { erroNome, erroDescricao } = erros;

  useEffect(() => {
    if (id) {
      setFormulario((prevState) => ({
        ...prevState,
        loading: true,
      }));

      Fetch.get(`/cargo/${id}`)
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
  }, [nome, descricao]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setFormulario((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const payload = { id, nome, descricao, situacao };

      Fetch.post('/cargo', payload)
        .then(() => {
          toast.success('Cargo salvo com sucesso!');
          history.goBack();
        })
        .catch(() => {
          toast.error('Falha ao tentar salvar o cargo!');
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
      descricao: data?.descricao,
      situacao: data?.situacao,
    }));
  };

  const limparFormulario = () => {
    setFormulario((prevState) => ({
      ...prevState,
      nome: '',
      descricao: '',
      situacao: true
    }));

    setErros((prevState) => ({
      ...prevState,
      erroNome: false,
      erroDescricao: false,
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

    if (descricao.trim() === '') {
      setErros((prevState) => ({
        ...prevState,
        erroDescricao: true,
      }));
      valido = false;
    } else {
      setErros((prevState) => ({
        ...prevState,
        erroDescricao: false,
      }));
    }

    return valido;
  };

  return (
    <Container className="mt-5">
      <Loading loading={loading} />
      <h2>Cadastro de Cargo</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={8}>
            <Input
              type="text"
              id="nome"
              label={'Nome'}
              value={nome}
              onChange={(e) => setFormulario((prevState) => ({ ...prevState, nome: e.target.value }))}
              erro={erroNome}
            />
          </Col>
          <Col md={4}>
            <InputSelect
              id="situacao"
              label="Situacao"
              value={situacao}
              options={situacoes}
              onChange={() => setFormulario((prevState) => ({ ...prevState, situacao: !situacao }))}
              disabled={!id}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              type="text"
              id="descricao"
              label="Descrição"
              value={descricao}
              onChange={(e) => setFormulario((prevState) => ({ ...prevState, descricao: e.target.value }))}
              erro={erroDescricao}
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

export default FormCargo;
