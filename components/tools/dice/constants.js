export const MODIFIERS = {
  DISADVANTAGE: 0,
  NORMAL: 1,
  ADVANTAGE: 2,
  DOUBLE_ADVANTAGE: 3
};

const MODIFIER_AVERAGE = {
  DISADVANTAGE: 7.17,
  NORMAL: 10.5,
  ADVANTAGE: 13.825,
  DOUBLE_ADVANTAGE: 15.49
};

export const TYPES = {
  ATTACK: 0,
  SAVE: 1
};

export const ATTACK_DEFAULTS = {
  attackName: '',
  attackBonus: '+0',
  targetAc: 10,
  attackDamage: '1d6',
  modifier: MODIFIERS.NORMAL,
  numberOfAttacks: 1,
  critChance: '0.05'
};

export const SAVE_DEFAULTS = {
  saveName: '',
  saveDc: 10,
  saveBonus: '+0',
  saveDamage: '1d6',
  modifier: MODIFIERS.NORMAL,
  numberOfAttacks: 1,
  halfOnSave: false
};