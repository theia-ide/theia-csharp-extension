/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from "inversify";
import { IConnection, BaseLanguageServerContribution } from "@theia/languages/lib/node";
import { CSHARP_LANGUAGE_ID, CSHARP_LANGUAGE_NAME } from '../common';
import { parseArgs } from '@theia/process/lib/node/utils';
import { SpawnOptions } from 'child_process';
import { ProcessErrorEvent } from '@theia/process/lib/node/process';

const path = require('path');

@injectable()
export class CSharpContribution extends BaseLanguageServerContribution {

    readonly id = CSHARP_LANGUAGE_ID;
    readonly name = CSHARP_LANGUAGE_NAME;

    async start(clientConnection: IConnection): Promise<void> {
        let command =  path.resolve(__dirname,'../../omnisharp/run');
        let args: string[] = [
            '-stdio',
            '-lsp'
        ];

        const csharpLsCommand = process.env.CSHARP_LS_COMMAND;
        if (csharpLsCommand) {
            command = csharpLsCommand;
            args = parseArgs(process.env.CSHARP_LS_ARGS || '');
        }

        console.info(`starting C# language server: ${command} ${args.join(' ')}`)
        const serverConnection = await this.createProcessStreamConnectionAsync(command, args, this.getSpawnOptions());
        this.forward(clientConnection, serverConnection);
    }

    protected getSpawnOptions(): SpawnOptions | undefined {
        return undefined;
    }

    protected onDidFailSpawnProcess(error: ProcessErrorEvent): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting C# language server.");
        console.error("Please make sure it is installed on your system.");
    }
}
