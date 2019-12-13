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



import { injectable } from "inversify";
import { PkApi } from "@symlinkde/eco-os-pk-models";
import { CustomRestError } from "../error";
import { apiResponseCodes } from "../util";
import { ITargetObjectOverride } from "./ITargetObject";

@injectable()
export class Validator implements PkApi.IValidator {
  public validate<T extends any>(
    target: T,
    pattern: PkApi.IValidatorPattern,
    options?: Array<PkApi.IValidatorOption>,
  ): void | PkApi.ICustomRestError {
    Object.keys(pattern).map((key) => {
      const check: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(target, key);
      if (check === undefined || check === null) {
        throw new CustomRestError(
          {
            code: apiResponseCodes.C826.code,
            message: `missing ${key} in request`,
          },
          400,
        );
      }

      if (target[key] === undefined || target[key] === null || target[key].length < 1) {
        throw new CustomRestError(
          {
            code: apiResponseCodes.C826.code,
            message: `missing value for ${key} in request`,
          },
          400,
        );
      }

      if (options) {
        this.validateOptions<T>(target, options);
      }
    });
    return;
  }

  private validateOptions<T extends ITargetObjectOverride>(target: T, options: Array<PkApi.IValidatorOption>): void {
    options.map((option: PkApi.IValidatorOption) => {
      this.performTypeCheck(target, option);
      this.validateMinLength(target, option);
      this.validateMaxLength(target, option);
      this.validateChars(target, option);
      this.validateNumbers(target, option);
      this.validateArray(target, option);
    });
    return;
  }

  private validateArray<T extends ITargetObjectOverride>(target: T, option: PkApi.IValidatorOption): void {
    if (target !== undefined && option.requireArray && !Array.isArray(target[option.field])) {
      this.throwTypeError(option.field);
    }

    return;
  }

  private validateNumbers<T extends ITargetObjectOverride>(target: T, option: PkApi.IValidatorOption): void {
    if (target !== undefined && option.onlyNumber && !/^\d+$/.test(String(target[option.field]))) {
      this.throwTypeError(option.field);
    }

    return;
  }

  private validateChars<T extends ITargetObjectOverride>(target: T, option: PkApi.IValidatorOption): void {
    if (target !== undefined && option.onlyChars && !/^[A-Za-z]+$/.test(String(target[option.field]))) {
      this.throwTypeError(option.field);
    }

    return;
  }

  private validateMaxLength<T extends ITargetObjectOverride>(target: T, option: PkApi.IValidatorOption): void {
    if (target !== undefined && option.maxLength && String(target[option.field]).length > option.maxLength) {
      this.throwTypeError(option.field);
    }

    return;
  }

  private validateMinLength<T extends ITargetObjectOverride>(target: T, option: PkApi.IValidatorOption): void {
    if (target !== undefined && option.minLength && String(target[option.field]).length < option.minLength) {
      this.throwTypeError(option.field);
    }

    return;
  }

  private performTypeCheck<T extends ITargetObjectOverride>(target: T, option: PkApi.IValidatorOption): void {
    if (target !== undefined && option.typeCheck && typeof target[option.field] !== option.targetType) {
      this.throwTypeError(option.field);
    }
    return;
  }

  private throwTypeError(field: string): void {
    throw new CustomRestError(
      {
        code: apiResponseCodes.C859.code,
        message: `wrong type in payload for field ${field}`,
      },
      400,
    );
  }
}
