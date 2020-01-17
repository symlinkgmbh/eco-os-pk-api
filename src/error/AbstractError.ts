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




export abstract class AbstractError {
    public name: string;
    public message: string;
    public status: number;

    constructor(_name: string, _message: string, _status?: number) {
      this.name = _name;
      this.message = _message;
      this.status = _status === undefined ? 500 : _status;
    }

    public setName(_name: string): void {
      this.name = _name;
    }

    public setMessage(_message: string): void {
      this.message = _message;
    }

    public setStatus(_status: number): void {
      this.status = _status;
    }

    public getName(): string {
      return this.name;
    }

    public getMessage(): string {
      return this.message;
    }

    public getStatus(): number {
      return this.status;
    }
  }
