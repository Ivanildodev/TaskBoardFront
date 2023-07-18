import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { posicoes } from '../static/posicoes';
import Fetch from '../providers/Fetch';
import 'react-toastify/dist/ReactToastify.css';

const Board = () => {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    Fetch.get('/tarefa')
      .then(({ data }) => {
        setTarefas(data);
      })
      .catch(() => {
        toast.error('Erro ao carregar as tarefas!');
      });
  }, []);

  const atualizarCard = (card, success, error) => {
    Fetch.post(`/card/`, card)
      .then(({ data }) => {
        success(data);
      })
      .catch(() => {
        error(error);
      });
  }

  const moverTask = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const posicaoOrigem = parseInt(source.droppableId);
    const posicaoDestino = parseInt(destination.droppableId);
    const indiceOrigem = source.index;
    const indiceDestino = destination.index;

    if (posicaoOrigem === posicaoDestino && indiceOrigem === indiceDestino) {
      return;
    }

    const tarefaMovida = tarefas.find((tarefa) => tarefa.card.posicao == posicaoOrigem);

    atualizarCard({ ...tarefaMovida.card, posicao: posicaoDestino }, () => {
      const novaListaTarefas = Array.from(tarefas);

      tarefaMovida.card.posicao = posicaoDestino;

      setTarefas(novaListaTarefas);
    }, () => {
      toast.error('Erro ao mover o card!');
    })
  };

  return (
    <Container className="p-2">
      <DragDropContext onDragEnd={moverTask}>
        <Row>
          {posicoes.map((p) => (
            <Col key={p.id}>
              <Row className="mb-2">
                <Col>
                  <h5>{p.name}</h5>
                </Col>
              </Row>
              <Droppable droppableId={p.id.toString()}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tarefas
                      .filter((tarefa) => tarefa.card.posicao === p.id)
                      .sort((a, b) => a.card.ordem - b.card.ordem)
                      .map((tarefa, index) => (
                        <Draggable
                          key={tarefa.id}
                          draggableId={tarefa.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                className="mt-2"
                                style={{ backgroundColor: tarefa.card?.cor }}
                              >
                                <Card.Body>
                                  <Card.Title>{tarefa.card?.nome}</Card.Title>
                                  <Card.Text className="text-truncate">{tarefa.nome}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                  <Card.Text className="text-truncate">{tarefa.responsavel?.nome}</Card.Text>
                                </Card.Footer>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          ))}
        </Row>
      </DragDropContext>
      <ToastContainer />
    </Container>
  );
};

export default Board;
