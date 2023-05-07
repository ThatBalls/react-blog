import { useState } from "react";
import { Button, Alert, Card, Stack, Row } from 'react-bootstrap';

import { AttackModal } from "./AttackModal";
import { SaveModal } from "./SaveModal";
import { TYPES, ATTACK_DEFAULTS, SAVE_DEFAULTS } from './constants';
import { ButtonRow, CardFlex } from "./DiceTool.css";

export const DiceTool = () => {
  const [showAttackModal, setShowAttackModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [attackResult, setAttackResult] = useState(null);
  const [saveResult, setSaveResult] = useState(null);
  const [entireResult, setEntireResult] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleModalClose = () => {
    setShowAttackModal(false);
    setAttackResult(null);
    setShowSaveModal(false);
    setSaveResult(null);
  };

  const handleAddResult = (result, editIndex) => {
    if (editIndex !== null) {
      const newResults = entireResult.slice();
      newResults[editIndex] = result;
      setEntireResult(newResults);
      setEditIndex(null);
    } else {
      setEntireResult([
        ...entireResult,
        result
      ]);
    }
    setShowAttackModal(false);
    setShowSaveModal(false);
    setAttackResult(null);
    setSaveResult(null);
  };

  const onEditClicked = resultIndex => {
    const editResult = entireResult[resultIndex];
    setEditIndex(resultIndex);
    if (editResult.type === TYPES.ATTACK) {
      setAttackResult(editResult);
      setShowAttackModal(true);
    } else {
      setSaveResult(editResult);
      setShowSaveModal(true);
    }
  };

  const onDeleteClicked = resultIndex => {
    console.log(resultIndex);
    const newResult = entireResult.slice();
    newResult.splice(resultIndex, 1);
    setEntireResult(newResult);
  };

  return (
    <Stack gap={3}>
      <ButtonRow>
        <Button variant="primary" size='lg' onClick={() => setShowAttackModal(true)}>Add Attack</Button>
        <Button variant="primary" size='lg' onClick={() => setShowSaveModal(true)}>Add Target Save</Button>
      </ButtonRow>
      {entireResult.length > 0 && <Alert variant='primary'>
        <p>Total Average Damage: {entireResult.reduce((total, attack) => {
          return total + (attack.averageDamage * attack.numberOfAttacks);
        }, 0)}</p>
      </Alert>}
      <CardFlex>
        {entireResult.map((resultObj, i) => {
          const title = resultObj.attackName || resultObj.saveName || (resultObj.type === TYPES.ATTACK ? `Attack ${i + 1}` : `Save ${i + 1}`)
          return (
            <Card key={`card-${i}`}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  <Alert variant='primary'>
                    <p>Chance to hit: {resultObj.chanceToHit}</p>
                    <p>Average attack damage: {resultObj.averageDamage}</p>
                    <p>Number of Attacks: {resultObj.numberOfAttacks}</p>
                    <p>Total Average Damage: {resultObj.averageDamage * resultObj.numberOfAttacks}</p>
                  </Alert>
                </Card.Text>
                <Stack direction='horizontal' gap={3}>
                  <Button variant='info' onClick={() => onEditClicked(i)}>Edit</Button>
                  <Button variant='danger' onClick={() => onDeleteClicked(i)}>Delete</Button>
                </Stack>
              </Card.Body>
            </Card>
          )
        })}
      </CardFlex>
      <AttackModal
        showAttackModal={showAttackModal}
        handleAttackClose={handleModalClose}
        handleAddAttack={handleAddResult}
        editIndex={editIndex}
        initialValues={attackResult || ATTACK_DEFAULTS} />
      <SaveModal
        showSaveModal={showSaveModal}
        handleSaveClose={handleModalClose}
        handleAddSave={handleAddResult}
        editIndex={editIndex}
        initialValues={saveResult || SAVE_DEFAULTS} />
    </Stack>);
};