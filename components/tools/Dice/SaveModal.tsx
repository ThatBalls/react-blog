import {useState, useEffect} from 'react';
import { Button, TextField, Radio, RadioGroup, Checkbox, FormControlLabel, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Dice from 'dice-notation-js';
import { MODIFIERS, TYPES, SAVE_DEFAULTS } from './constants';
import { DialogInputForm, DialogTextInput } from './DiceTool.css';

export const SaveModal = ({
  showSaveModal,
  handleSaveClose,
  handleAddSave,
  editIndex,
  initialValues
}) => {
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
        chanceToSave = Math.pow(chanceToSave, 2);
        break;
      case MODIFIERS.ADVANTAGE:
        // Advantage is calculated by both attacks NOT missing
        chanceToSave = 1 - Math.pow((1 - chanceToSave), 2);
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
    console.log(chanceToSave);
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

  return (<Dialog open={showSaveModal} onClose={handleSaveClose}>
    <DialogTitle>Add Target Save</DialogTitle>
    <DialogInputForm>
      <DialogTextInput
        label="Save Name"
        variant="outlined"
        value={saveName}
        placeholder="Enter Save Name (Optional)"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSaveName(event.target.value);
        }}
      />
      <DialogTextInput
        label="Save DC"
        variant="outlined"
        value={saveDc}
        placeholder="Enter DC"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSaveDc(event.target.value);
        }}
      />
      <DialogTextInput
        label="Save Damage"
        variant="outlined"
        value={saveDamage}
        placeholder="Enter damage on failed save"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSaveDamage(event.target.value);
        }}
      />
      <DialogTextInput
        label="Target Save Bonus"
        variant="outlined"
        value={saveBonus}
        placeholder="Enter save bonus"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSaveBonus(event.target.value);
        }}
      />
      <RadioGroup defaultValue={MODIFIERS.NORMAL} onChange={(_, value) => setModifier(value)}>
        <FormControlLabel value={MODIFIERS.DISADVANTAGE} control={<Radio />} label="Disadvantage" />
        <FormControlLabel value={MODIFIERS.NORMAL} control={<Radio />} label="No Advantage" />
        <FormControlLabel value={MODIFIERS.ADVANTAGE} control={<Radio />} label="Advantage" />
      </RadioGroup>
      <DialogTextInput
        label="Number of Targets"
        variant="outlined"
        value={numberOfTargets}
        placeholder="Enter number of targets"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNumberOfTargets(event.target.value);
        }}
      />
      <FormControlLabel
        value={halfOnSave}
        control={<Checkbox onChange={(event) => setHalfOnSave(event.target.checked)} />}
        label="Half Damage on Save" />
      {validationError && <Alert icon={<></>} severity='error'>{validationError.message}</Alert>}
      {saveResult && <Alert icon={<></>} severity="warning">
        <p>Chance to hit: {saveResult.chanceToHit}</p>
        <p>Average attack damage: {saveResult.averageDamage}</p>
        <p>Total Average Damage: {saveResult.averageDamage * saveResult.numberOfAttacks}</p>
      </Alert>}
    </DialogInputForm>
    <DialogActions>
      <Button variant="outlined" onClick={handleAnalyzeSave}>
        Analyze
      </Button>
      <Button variant="contained" onClick={onSaveClicked}>
        {editIndex !== null ? "Save" : "Add"}
      </Button>
    </DialogActions>
  </Dialog>);
}