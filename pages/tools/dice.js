import {useState} from 'react';
import Head from 'next/head';
import { Button, Alert, Card, Stack, Row } from 'react-bootstrap';
import Dice from 'dice-notation-js';
import AttackModal from 'components/tools/Dice/AttackModal';
import SaveModal from 'components/tools/Dice/SaveModal';
import { TYPES, ATTACK_DEFAULTS, SAVE_DEFAULTS } from 'components/tools/Dice/constants';
import { DiceTool } from "components/tools";
import styles from './Dice.module.css';

export default function DiceCalculator() {
/*   const [showAttackModal, setShowAttackModal] = useState(false);
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
    const newResult = entireResult.slice();
    newResult.splice(resultIndex, 1);
    setEntireResult(newResult);
  };
   */
  return (
    <div className={styles.container}>
      <Head>
        <title>Dice Calculator</title>
        <meta name="description" content={`Calculate all your dice rolls`} />
        <meta property="og:title" content={`Dice Calculator`} />
        <meta property="og:description" content={`Calculate all your dice rolls`} />
        <meta property="og:url" content={`https://diredice.com/tools/dice`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DiceTool />
      {/* <Stack gap={3}>
        <Stack direction='horizontal' gap={3} className={styles.buttonRow}>
          <Button variant="primary" size='lg' onClick={() => setShowAttackModal(true)}>Add Attack</Button>
          <Button variant="primary" size='lg' onClick={() => setShowSaveModal(true)}>Add Target Save</Button>
        </Stack>
        {entireResult.length > 0 && <Alert variant='primary'>
          <p>Total Average Damage: {entireResult.reduce((total, attack) => {
            return total + (attack.averageDamage * attack.numberOfAttacks);
          }, 0)}</p>
        </Alert>}
        <div className={styles.cardFlex}>
          {entireResult.map((resultObj, i) => {
            const title = resultObj.attackName || resultObj.saveName || (resultObj.type === TYPES.ATTACK ? `Attack ${i+1}` : `Save ${i+1}`)
            return (
              <Card key={`${resultObj.chanceToHit}-${resultObj.averageDamage}-${resultObj.numberOfAttacks}`}>
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
        </div>
        <AttackModal
          showAttackModal={showAttackModal}
          handleAttackClose={handleModalClose}
          handleAddAttack={handleAddResult}
          editIndex={editIndex}
          initialValues={attackResult || ATTACK_DEFAULTS}/>
        <SaveModal
          showSaveModal={showSaveModal}
          handleSaveClose={handleModalClose}
          handleAddSave={handleAddResult}
          editIndex={editIndex}
          initialValues={saveResult || SAVE_DEFAULTS}/>
        </Stack>*/}
      {/* <Tabs defaultActiveKey="attack" id="roll-tabs" className="mb-3">
        <Tab eventKey="attack" title="Attack Roll">
          <Form onSubmit={handleAttackSubmit}>
            <Form.Group className="mb-3" controlId="formAttackBonus">
              <Form.Label>Attack Bonus</Form.Label>
              <Form.Control
                type="text"
                value={attackBonus}
                onChange={(event) => setAttackBonus(event.target.value)} 
                placeholder="Enter bonus" />
              <Form.Text className="text-muted">
                Specify + or -
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAttackDamage">
              <Form.Label>Attack Damage</Form.Label>
              <Form.Control
                type="text"
                value={attackDamage}
                onChange={(event) => setAttackDamage(event.target.value)} 
                placeholder="Enter damage" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAttackBonus">
              <Form.Label>Target AC</Form.Label>
              <Form.Control
                type="text"
                value={targetAc}
                onChange={(event) => setTargetAc(event.target.value)}
                placeholder="Enter AC" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAdvantageRadio" value={modifier}>
              <Form.Check inline
                id='attackDisadvantage'
                name="advantageGroup"
                type="radio"
                value={MODIFIERS.DISADVANTAGE}
                onChange={() => setModifier(MODIFIERS.DISADVANTAGE)}
                label="Disadvantage" />
              <Form.Check inline
                id='attackNormal'
                name="advantageGroup"
                type="radio"
                value={MODIFIERS.NORMAL}
                defaultChecked
                onChange={() => setModifier(MODIFIERS.NORMAL)}
                label="No Advantage" />
              <Form.Check inline
                id='attackAdvantage'
                name="advantageGroup"
                type="radio"
                value={MODIFIERS.ADVANTAGE}
                onChange={() => setModifier(MODIFIERS.ADVANTAGE)}
                label="Advantage" />
              <Form.Check inline
                id='attackDAdvantage'
                name="advantageGroup"
                type="radio"
                value={MODIFIERS.DOUBLE_ADVANTAGE}
                onChange={() => setModifier(MODIFIERS.DOUBLE_ADVANTAGE)}
                label="Double Advantage" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Number of Attacks</Form.Label>
              <Form.Control
                type="text"
                value={numberOfAttacks}
                onChange={(event) => setNumberOfAttacks(event.target.value)} 
                placeholder="Enter number of attacks" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Critical Chance</Form.Label>
              <Form.Control
                type="text"
                value={critChance}
                onChange={(event) => setCritChance(event.target.value)} 
                placeholder="Enter Critical Chance" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Analyze
            </Button>
            <Button variant="primary" onClick={handleAddAttack}>
              Add
            </Button>
          </Form>
          {attackResult && <Alert variant='primary'>
            <p>Chance to hit: {attackResult.chanceToHit}</p>
            <p>Average attack damage: {attackResult.averageDamage}</p>
            <p>Total Average Damage: {attackResult.averageDamage * attackResult.numberOfAttacks}</p>
          </Alert>}
        </Tab>
        <Tab eventKey="save" title="Target Save">
          <Form onSubmit={handleSaveSubmit}>
            <Form.Group className="mb-3" controlId="formSave">
              <Form.Label>Save DC</Form.Label>
              <Form.Control
                type="text"
                value={saveDc}
                onChange={(event) => setSaveDc(event.target.value)}
                placeholder="Enter DC" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSaveDamage">
              <Form.Label>Attack Damage</Form.Label>
              <Form.Control
                type="text"
                value={saveDamage}
                onChange={(event) => setSaveDamage(event.target.value)} 
                placeholder="Enter damage" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSaveBonus">
              <Form.Label>Target Save Bonus</Form.Label>
              <Form.Control
                type="text"
                value={saveBonus}
                onChange={(event) => setSaveBonus(event.target.value)}
                placeholder="Enter Save Bonus" />
              <Form.Text className="text-muted">
                Specify + or -
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAdvantageCheck" value={modifier}>
              <Form.Check inline
                id='saveDisadvantage'
                name="advantageGroup"
                type="radio"
                value={MODIFIERS.DISADVANTAGE}
                onChange={() => setModifier(MODIFIERS.DISADVANTAGE)}
                label="Disadvantage" />
              <Form.Check inline
                id='saveNormal'
                name="advantageGroup"
                type="radio"
                value={MODIFIERS.NORMAL}
                defaultChecked
                onChange={() => setModifier(MODIFIERS.NORMAL)}
                label="No Advantage" />
              <Form.Check inline
                id='savedvantage'
                name="advantageGroup"
                type="radio"
                value={MODIFIERS.ADVANTAGE}
                onChange={() => setModifier(MODIFIERS.ADVANTAGE)}
                label="Advantage" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Number of Targets</Form.Label>
              <Form.Control
                type="text"
                value={numberOfTargets}
                onChange={(event) => setNumberOfTargets(event.target.value)} 
                placeholder="Enter number of targets" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Analyze
            </Button>
            <Button variant="primary" onClick={handleAddSave}>
              Add
            </Button>
          </Form>
          {saveReult && <Alert variant='primary'>
            Average save damage: 
          </Alert>}
        </Tab>
      </Tabs> */}
    </div>
  )
};