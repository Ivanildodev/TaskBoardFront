import React from "react"
import { Button, Col, Row } from "react-bootstrap";

const HeaderView = ({titulo, adicionar}) => {
    return (
        <Row className="justify-content-between mb-3 mt-4">
            <Col>
                <h2>{titulo}</h2>
            </Col>
            <Col className="text-end">
                <Button variant="primary" onClick={() => adicionar()}>
                    Cadastrar
                </Button>
            </Col>
        </Row>
    )
}

export default HeaderView;