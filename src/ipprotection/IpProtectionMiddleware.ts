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
import { PkCore } from "@symlinkde/eco-os-pk-models";
import { serviceContainer, ECO_OS_PK_CORE_TYPES } from "@symlinkde/eco-os-pk-core";
import { IPParser } from "@symlinkde/eco-os-pk-parse";
import { Log, LogLevel } from "@symlinkde/eco-os-pk-log";
import { CustomRestError } from "../error";

const extractAddress = (req: Request): string | string[] | null => {
  const xForwardedFor: string | string[] | undefined = req.headers["x-forwarded-for"];
  const remoteAddress: string | undefined = req.connection.remoteAddress;
  const requestingAddress: string | string[] | undefined = xForwardedFor || remoteAddress;

  return IPParser.extractIpV4Address(requestingAddress === undefined ? "" : requestingAddress);
};

const ipProtectionMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  if (req.path.split("/")[1] === "heartbeat" || req.path.split("/")[1] === "metrics") {
    next();
    return;
  }

  const extractedIpAddress = await extractAddress(req);
  const ipProtectionService: PkCore.IEcoIpProtectionClient = serviceContainer.get<PkCore.IEcoIpProtectionClient>(
    ECO_OS_PK_CORE_TYPES.IEcoIpProtectionClient,
  );

  try {
    if (extractedIpAddress === null) {
      Log.log("skipp ip check for localhost", LogLevel.warning);
      next();
      return;
    }

    if (Array.isArray(extractedIpAddress)) {
      extractedIpAddress.map(async (address: string) => {
        await ipProtectionService.processIpAddress(address);
      });
      next();
    } else {
      await ipProtectionService.processIpAddress(extractedIpAddress);
      next();
    }
  } catch (err) {
    if (err.reponse && err.response.status === 403) {
      throw new CustomRestError(
        {
          code: 403,
          message: "request blocked",
        },
        403,
      );
    }

    next();
    return;
  }
};

export { ipProtectionMiddleware };
