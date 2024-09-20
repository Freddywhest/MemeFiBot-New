const FreeBoostType = Object.freeze({
  TURBO: "Turbo",
  ENERGY: "Recharge",
});

const UpgradableBoostType = Object.freeze({
  TAP: "Damage",
  ENERGY: "EnergyCap",
  CHARGE: "EnergyRechargeRate",
  TAPBOT: "TapBot",
});

module.exports = {
  FreeBoostType,
  UpgradableBoostType,
};
