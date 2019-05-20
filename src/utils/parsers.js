export function parseConfigurations(confs) {
  const configurations = confs.map((conf) => ({
    date: new Date(conf.date.seconds * 1000),
    workingDays: conf.workingDays,
    restDays: conf.restDays,
    turn: conf.turn,
  }));

  return configurations;
}
