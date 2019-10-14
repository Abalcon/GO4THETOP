import React from 'react';
import {Row, Col} from "reactstrap";

export const Qualifiers = () => {

    return (
        <div className="container">
            <h4>Lower 본선 진출자</h4>
            <Row tag="h5" style={{textAlign: 'center'}}>
                <Col md={3} style={{backgroundColor: 'Gold'}}>RETOREE</Col>
                <Col md={3} style={{backgroundColor: 'Silver'}}>JUPITER</Col>
                <Col md={3}>DANOBAK</Col>
                <Col md={3}>COCOA</Col>
            </Row>
            <Row tag="h5" style={{textAlign: 'center'}}>
                <Col md={3}>ZAYUEX1A</Col>
                <Col md={3}>WUTOT</Col>
                <Col md={3}>BRDCASE</Col>
                <Col md={3}>FEFEMZ</Col>
            </Row>
            <Row tag="h5" style={{textAlign: 'center'}}>
                <Col md={3}>5T0HA</Col>
                <Col md={3}>HIKARI</Col>
                <Col md={3}>NINEMYUZ</Col>
                <Col md={3}>CONFUZE</Col>
            </Row>
            <Row tag="h5" style={{textAlign: 'center'}}>
                <Col md={3}>YUKARI-.</Col>
                <Col md={3}>N00B</Col>
                <Col md={3}>LJW-LUNA</Col>
                <Col md={3}>KIM-DH--</Col>
            </Row>
            <br/>
            <h4>Upper 본선 진출자</h4>
            <Row tag="h5" style={{textAlign: 'center'}}>
                <Col md={3} style={{backgroundColor: 'Gold'}}>FEFEMZ</Col>
                <Col md={3} style={{backgroundColor: 'Silver'}}>RETOREE</Col>
                <Col md={3}>RSS</Col>
                <Col md={3}>COCOA</Col>
            </Row>
            <Row tag="h5" style={{textAlign: 'center'}}>
                <Col md={3}>EPOS</Col>
                <Col md={3}>UNKNOWN</Col>
                <Col md={3}>FILITE</Col>
                <Col md={3}>NAMUWIKI</Col>
            </Row>
            <Row tag="h5" style={{textAlign: 'center'}}>
                <Col md={3}>ANTITEZE</Col>
                <Col md={3}>SETH</Col>
                <Col md={3}>RAHWA</Col>
                <Col md={3}>LEESEULB</Col>
            </Row>
            <Row tag="h5" style={{textAlign: 'center'}}>
                <Col md={3}>ZAYUEX1A</Col>
                <Col md={3}>CONFUZE</Col>
                <Col md={3}>NINEMYUZ</Col>
                <Col md={3}>MEIER</Col>
            </Row>
        </div>
    );
};