import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import Fetch from '../../providers/Fetch';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import InputSelect from '../../components/InputSelect';
import { situacoes } from '../../static/situacoes';
import 'react-toastify/dist/ReactToastify.css';

const FormColaborador = () => {
  const history = useHistory();
  const location = useLocation();
  const { id } = location?.state || {};

  const [formulario, setFormulario] = useState({
    nome: '',
    telefone: '',
    situacao: true,
    cargoId: 0,
    linkedin: '',
    cargosDisponiveis: [],
    loading: false
  });

  const [erros, setErros] = useState({
    erroNome: false,
    erroTelefone: false,
    erroCargo: false,
    erroLinkedin: false,
  })

  const {
    nome,
    telefone,
    situacao,
    cargoId,
    linkedin,
    cargosDisponiveis,
    loading
  } = formulario;

  const {
    erroNome,
    erroTelefone,
    erroCargo,
    erroLinkedin,
  } = erros;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFormulario((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const response = await Fetch.get('/cargo');
        const data = response.data;
        const itens = [{ value: 0, label: 'Selecione' }];

        data.forEach((cargo) => {
          itens.push({ value: cargo.id, label: cargo.nome });
        });

        setFormulario((prevState) => ({
          ...prevState,
          cargosDisponiveis: itens,
        }));
      } catch (error) {
        toast.error('Não foi possível carregar os cargos disponíveis!');
      } finally {
        setFormulario((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      setFormulario((prevState) => ({
        ...prevState,
        loading: true,
      }));

      Fetch.get(`/colaborador/${id}`)
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
  }, [nome, telefone, cargoId, linkedin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setFormulario((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const payload = { id, nome, telefone, cargoId, situacao, linkedin };

      Fetch.post('/colaborador', payload)
        .then(() => {
          toast.success('Colaborador salvo com sucesso!');
          history.goBack();
        })
        .catch((err) => {
          toast.error('Falha ao tentar salvar o colaborador!');
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
      nome: data?.nome,
      telefone: data?.telefone,
      cargoId: data?.cargoId,
      situacao: data?.situacao,
      linkedin: data?.linkedin,
    }));
  };

  const limparFormulario = () => {
    setFormulario((prevState) => ({
      ...prevState,
      nome: '',
      telefone: '',
      situacao: true,
      erroNome: false,
      erroTelefone: false,
    }));

    setErros((prevState) => ({
      ...prevState,
      erroNome,
      erroTelefone,
      erroCargo,
      erroLinkedin
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

    if (telefone.trim() === '') {
      setErros((prevState) => ({
        ...prevState,
        erroTelefone: true,
      }));
      valido = false;
    } else {
      setErros((prevState) => ({
        ...prevState,
        erroTelefone: false,
      }));
    }

    if (cargoId === 0) {
      setErros((prevState) => ({
        ...prevState,
        erroCargo: true,
      }));
      valido = false;
    } else {
      setErros((prevState) => ({
        ...prevState,
        erroCargo: false,
      }));
    }

    if (linkedin.trim() === '') {
      setErros((prevState) => ({
        ...prevState,
        erroLinkedin: true,
      }));
      valido = false;
    } else {
      setErros((prevState) => ({
        ...prevState,
        erroLinkedin: false,
      }));
    }

    return valido;
  };

  return (
    <Container className="mt-5">
      <Loading loading={loading} />
      <h2>Cadastro de Colaborador</h2>
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
            <Input
              type="phone"
              id="telefone"
              label="Telefone"
              value={telefone}
              onChange={(e) => setFormulario((prevState) => ({ ...prevState, telefone: e.target.value.replace(/\s|\(|\)|-/g, '') }))}
              erro={erroTelefone}
            />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <InputSelect
              id="cargo"
              label="Cargo"
              value={cargoId}
              options={cargosDisponiveis}
              onChange={(e) => setFormulario((prevState) => ({ ...prevState, cargoId: e.target.value }))}
              erro={erroCargo}
            />
          </Col>
          <Col md={4}>
            <InputSelect
              id="situacao"
              label="Situacao"
              value={situacao}
              options={situacoes}
              onChange={() => setFormulario((prevState) => ({ ...prevState, situacao: !situacao }))}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              type="text"
              id="linkedin"
              label="Linkedin"
              value={linkedin}
              onChange={(e) => setFormulario((prevState) => ({ ...prevState, linkedin: e.target.value }))}
              erro={erroLinkedin}
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

export default FormColaborador;
