import {useState, useEffect} from 'react';
import { Form, Button, Modal, InputGroup, FormControl, Alert } from 'react-bootstrap';
import Dice from 'dice-notation-js';
import { MODIFIERS, TYPES, SAVE_DEFAULTS } from './constants';

export default function SaveModal({
  showSaveModal,
  handleSaveClose,
  handleAddSave,
  editIndex,
  initialValues
}) {
  const [saveName, setSaveName] = useState(initialValues.saveName);
  const [saveDc, setSaveDc] = useState(initialValues.saveDc);
  const [saveBonus, setSaveBonus] = useState(initialValues.saveBonus);
  const [saveDamage, setSaveDamage] = useState(initialValues.saveDamage);
  const [modifier, setModifier] = useState(initialValues.modifier);
  const [numberOfTargets, setNumberOfTargets] = useState(initialValues.numberOfAttacks);
  const [halfOnSave, setHalfOnSave] = useState(initialValues.halfOnSave);
  const [saveResult, setSaveResult] = useState(null);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const setValues = resultObj => {
    setSaveName(resultObj.saveName);
    setSaveDc(resultObj.saveDc);
    setSaveBonus(resultObj.saveBonus);
    setSaveDamage(resultObj.saveDamage);
    setModifier(resultObj.modifier);
    setNumberOfTargets(resultObj.numberOfAttacks);
    setHalfOnSave(resultObj.halfOnSave);
    setValidationError(null);
  };

  const calculateSave = () => {
    let chanceToSave = (21 + parseInt(saveBonus) - parseInt(saveDc)) / 20;
    switch (modifier) {
      case MODIFIERS.DISADVANTAGE:
        // Disadvantage is calculated by both attacks hitting
        chanceToHit = Math.pow(chanceToHit, 2);
        break;
      case MODIFIERS.ADVANTAGE:
        // Advantage is calculated by both attacks NOT missing
        chanceToHit = 1 - Math.pow((1 - chanceToHit), 2);
        break;
      default:
        break;
    };

    let damageDice;
    try {
      damageDice = Dice.parse(saveDamage);
    } catch (err) {
      throw new Error("Failed to parse damage dice.");
    }

    const chanceToHit = 1 - chanceToSave;
    const averageDamageRoll = damageDice.number * ((damageDice.type + 1) / 2) + damageDice.modifier;
    const saveFailDamage = chanceToHit * averageDamageRoll;
    const saveSuccessDamage = halfOnSave ? chanceToSave * (averageDamageRoll / 2) : 0;
    const averageDamage = saveFailDamage + saveSuccessDamage;
    return {
      type: TYPES.SAVE,
      saveName,
      saveDc,
      saveBonus,
      saveDamage,
      chanceToHit: Math.round(chanceToHit * 100) / 100,
      averageDamage: Math.round(averageDamage * 100) / 100,
      numberOfAttacks: parseInt(numberOfTargets),
      halfOnSave
    };
  };

  const handleAnalyzeSave = () => {
    try {
      event.preventDefault();
      setSaveResult(calculateSave());
    } catch(err) {
      setValidationError(err);
    }
  };

  const onSaveClicked = () => {
    try {
      handleAddSave(calculateSave(), editIndex);
      setValues(SAVE_DEFAULTS);
    } catch(err) {
      setValidationError(err);
    }
  };

  return (<Modal centered show={showSaveModal} onHide={handleSaveClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Target Save</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <InputGroup className="mb-3" controlId="formSaveName">
        <InputGroup.Text>Save Name</InputGroup.Text>
        <FormControl
          type="text"
          value={saveName}
          onChange={(event) => setSaveName(event.target.value)}
          placeholder="Enter Save Name (Optional)" />
      </InputGroup>
      <InputGroup className="mb-3" controlId="formSave">
        <InputGroup.Text>Save DC</InputGroup.Text>
        <FormControl
          type="text"
          value={saveDc}
          onChange={(event) => setSaveDc(event.target.value)}
          placeholder="Enter DC" />
      </InputGroup>
      <InputGroup className="mb-3" controlId="formSaveDamage">
        <InputGroup.Text>Attack Damage</InputGroup.Text>
        <FormControl
          type="text"
          value={saveDamage}
          onChange={(event) => setSaveDamage(event.target.value)} 
          placeholder="Enter damage" />
      </InputGroup>
      <InputGroup className="mb-3" controlId="formSaveBonus">
        <InputGroup.Text>Target Save Bonus</InputGroup.Text>
        <FormControl
          type="text"
          value={saveBonus}
          onChange={(event) => setSaveBonus(event.target.value)}
          placeholder="Enter Save Bonus" />
        <InputGroup.Text className="text-muted">
          Specify + or -
        </InputGroup.Text>
      </InputGroup>
      <InputGroup className="mb-3" controlId="formAdvantageCheck" value={modifier}>
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
          id='saveAdvantage'
          name="advantageGroup"
          type="radio"
          value={MODIFIERS.ADVANTAGE}
          onChange={() => setModifier(MODIFIERS.ADVANTAGE)}
          label="Advantage" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Number of Targets</InputGroup.Text>
        <FormControl
          type="text"
          value={numberOfTargets}
          onChange={(event) => setNumberOfTargets(event.target.value)} 
          placeholder="Enter number of targets" />
      </InputGroup>
      <InputGroup>
        <Form.Check
          id='saveHalf'
          name="saveHalf"
          type="checkbox"
          checked={halfOnSave}
          onChange={(event) => setHalfOnSave(event.target.checked)}
          label="Half Damage on Save" />
      </InputGroup>
      {validationError && <Alert variant='danger'>{validationError.message}</Alert>}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleAnalyzeSave}>
        Analyze
      </Button>
      <Button variant="primary" onClick={onSaveClicked}>
        {editIndex !== null ? "Save" : "Add"}
      </Button>
    </Modal.Footer>
  </Modal>);
}