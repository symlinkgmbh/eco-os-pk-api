/**
 * Copyright 2018-2019 Symlink GmbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */



import { Request, Response, NextFunction } from "express";
import { Log, LogLevel } from "@symlinkde/eco-os-pk-log";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    Log.log(`Request------------------------START`, LogLevel.info);
    Log.log(`host`, LogLevel.info);
    Log.log(req.hostname, LogLevel.info);
    Log.log(`url`, LogLevel.info);
    Log.log(req.method, LogLevel.info);
    Log.log(`headers`, LogLevel.info);
    Log.log(req.headers, LogLevel.info);
    Log.log(`query`, LogLevel.info);
    Log.log(req.query, LogLevel.info);
    Log.log(`body`, LogLevel.info);
    Log.log(req.body, LogLevel.info);
    Log.log(`Request------------------------END`, LogLevel.info);
    next();
};

export { logMiddleware };
