import commander from 'commander';
import { init, resizeLauncher } from './resize';

commander.version('0.0.1')
  .option('-l, --launcher <file>', 'Generate launcher icons for android and ios')
  .option('-i, --icons <file>', 'Generate icons for android and ios')
  .parse(process.argv);

if (commander.launcher) {
  init();
  resizeLauncher(commander.launcher);
}
