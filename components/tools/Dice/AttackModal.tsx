import {useState, useEffect} from 'react';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Dice from 'dice-notation-js';
import { MODIFIERS, TYPES, ATTACK_DEFAULTS } from './constants';
import { DialogInputForm, DialogTextInput } from './DiceTool.css';


export const AttackModal = ({
  showAttackModal,
  handleAttackClose,
  handleAddAttack,
  editIndex,
  initialValues
}) => {
  const [attackName, setAttackName] = useState(initialValues.attackName);
  const [attackBonus, setAttackBonus] = useState(initialValues.attackBonus);
  const [targetAc, setTargetAc] = useState(initialValues.targetAc);
  const [attackDamage, setAttackDamage] = useState(initialValues.attackDamage);
  const [modifier, setModifier] = useState(initialValues.modifier);
  const [numberOfAttacks, setNumberOfAttacks] = useState(initialValues.numberOfAttacks);
  const [critChance, setCritChance] = useState(initialValues.critChance);
  const [attackResult, setAttackResult] = useState(null);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const setValues = resultObj => {
    setAttackName(resultObj.attackName);
    setAttackBonus(resultObj.attackBonus);
    setTargetAc(resultObj.targetAc);
    setAttackDamage(resultObj.attackDamage);
    setModifier(resultObj.modifier);
    setNumberOfAttacks(resultObj.numberOfAttacks);
    setCritChance(resultObj.critChance);
    setValidationError(null);
  };

  const calculateAttack = () => {
    let chanceToHit = (21 + parseInt(attackBonus) - parseInt(targetAc)) / 20;
    switch (modifier) {
      case MODIFIERS.DISADVANTAGE:
        // Disadvantage is calculated by both attacks hitting
        chanceToHit = Math.pow(chanceToHit, 2);
        break;
      case MODIFIERS.ADVANTAGE:
        // Advantage is calculated by both attacks NOT missing
        chanceToHit = 1 - Math.pow((1 - chanceToHit), 2);
        break;
      case MODIFIERS.DOUBLE_ADVANTAGE:
        // Similarly double advantage is the chance of all 3 attacks mising
        chanceToHit = 1 - Math.pow((1 - chanceToHit), 3);
        break;
      default:
        break;
    }

    let damageDice;
    try {
      damageDice = Dice.parse(attackDamage);
    } catch (err) {
      throw new Error("Failed to parse damage dice.");
    }
    
    const averageDamageRoll = damageDice.number * ((damageDice.type + 1) / 2) + damageDice.modifier;
    const averageDamage = chanceToHit * averageDamageRoll;
    const critBonus = parseFloat(critChance) * (damageDice.number * ((damageDice.type + 1) / 2));
    return {
      type: TYPES.ATTACK,
      attackName,
      attackBonus,
      targetAc,
      attackDamage,
      modifier,
      critChance,
      chanceToHit: Math.round(chanceToHit * 100) / 100,
      averageDamage: Math.round((averageDamage + critBonus) * 100) / 100,
      numberOfAttacks: parseInt(numberOfAttacks)
    };
  };

  const handleAnalyzeAttack = event => {
    try {
      event.preventDefault();
      setAttackResult(calculateAttack());
    } catch(err) {
      setValidationError(err);
    }
  };

  const onSaveClicked = () => {
    try {
      handleAddAttack(calculateAttack(), editIndex);
      setValues(ATTACK_DEFAULTS);
    } catch(err) {
      setValidationError(err);
    }
  };

  return (<Dialog open={showAttackModal} onClose={handleAttackClose}>
    <DialogTitle>Add Attack</DialogTitle>
    <DialogInputForm>
      <DialogTextInput
        label="Attack Name"
        variant="outlined"
        value={attackName}
        placeholder="Enter Name (Optional)"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAttackName(event.target.value);
        }}
      />
      <DialogTextInput
        label="Attack Bonus"
        variant="outlined"
        value={attackBonus}
        placeholder="Enter attack bonus"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAttackBonus(event.target.value);
        }}
      />
      <DialogTextInput
        label="Attack Damage"
        variant="outlined"
        value={attackDamage}
        placeholder="Enter damage"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAttackDamage(event.target.value);
        }}
      />
      <DialogTextInput
        label="Target AC"
        variant="outlined"
        value={targetAc}
        placeholder="Enter target's AC"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTargetAc(event.target.value);
        }}
      />
      <RadioGroup row defaultValue={MODIFIERS.NORMAL} onChange={(_, value) => setModifier(value)}>
        <FormControlLabel value={MODIFIERS.DISADVANTAGE} control={<Radio />} label="Disadvantage" />
        <FormControlLabel value={MODIFIERS.NORMAL} control={<Radio />} label="No Advantage" />
        <FormControlLabel value={MODIFIERS.ADVANTAGE} control={<Radio />} label="Advantage" />
        <FormControlLabel value={MODIFIERS.DOUBLE_ADVANTAGE} control={<Radio />} label="Double Advantage" />
      </RadioGroup>
      <DialogTextInput
        label="Number of Attacks"
        variant="outlined"
        value={numberOfAttacks}
        placeholder="Enter number of attacks"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNumberOfAttacks(event.target.value);
        }}
      />
      <DialogTextInput
        label="Critical Chance"
        variant="outlined"
        value={critChance}
        placeholder="Enter critical chance"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCritChance(event.target.value);
        }}
      />
      {validationError && <Alert icon={<></>} severity="error">{validationError.message}</Alert>}
      {attackResult && <Alert icon={<></>} severity="warning">
        <p>Chance to hit: {attackResult.chanceToHit}</p>
        <p>Average damage: {attackResult.averageDamage}</p>
        <p>Total Average Damage: {attackResult.averageDamage * attackResult.numberOfAttacks}</p>
      </Alert>}
    </DialogInputForm>
    <DialogActions>
      <Button variant="outlined" onClick={handleAnalyzeAttack}>
        Analyze
      </Button>
      <Button variant="contained" onClick={onSaveClicked}>
        {editIndex !== null ? "Save" : "Add"}
      </Button>
    </DialogActions>
  </Dialog>);
};