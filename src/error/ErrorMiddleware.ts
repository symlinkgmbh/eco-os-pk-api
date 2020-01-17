/**
 * Copyright 2018-2020 Symlink GmbH
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
import {RestError} from "./RestError";
import { Log, LogLevel } from "@symlinkde/eco-os-pk-log";
import { CustomRestError } from "./CustomRestError";

const errorMiddleware = (err: RestError | CustomRestError, req: Request, res: Response, next: NextFunction) => {
    Log.log(err, LogLevel.error);
    if(isValidJSON(err)) {
        res.status(err.status === undefined ? 500 : err.status).send(err);
        next();
    } else {
      res.status(500).send(new CustomRestError({
        code: 500,
        message: "internval server error",
      },500));
      next();
    }
};

function isValidJSON(obj: any): boolean {
    try {
      JSON.stringify(obj);
    } catch (e) {
      return false;
    }
    return true;
}

export {errorMiddleware};
