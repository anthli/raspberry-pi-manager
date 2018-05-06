import * as express from 'express';
import {Request, Response} from "express";
import * as morgan from 'morgan';
import * as path from 'path';

import Command from './command/command';
import {CommandSelection} from './command/commandSelection';

const BASE_PATH = path.join(__dirname, '../../');
const SCRIPTS_PATH = path.join(BASE_PATH, 'server/scripts');
const DIST_PATH = path.join(BASE_PATH, 'client/dist');
const PUBLIC_PATH = path.join(BASE_PATH, 'public');

const app = express();
const command = new Command(SCRIPTS_PATH);

// Logger
app.use(morgan('common'));

// Serve static files
app.use('/dist', express.static(DIST_PATH));
app.use('/public', express.static(PUBLIC_PATH));

// Set server properties
app.set("port", process.env.PORT || 3000);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(
    'client/index.html',
    {
      root: BASE_PATH
    });
});

app.get('/command/:selection/:name', (req: Request, res: Response) => {
  let selection = req.params.selection;
  let scriptName = req.params.name;

  // Single commands can be executed directly while group commands require
  // more logic
  switch (selection) {
    case CommandSelection.SINGLE:
      command.handleSingleCommand(res, scriptName);
      break;

    case CommandSelection.GROUP:
      command.handleGroupCommand(res, scriptName);
      break;

    default:
      res.send(404);
      break;
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});