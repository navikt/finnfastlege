import { CustomError } from "ts-custom-error";

export class Error403 extends CustomError {
  public constructor(public code: number, message?: string) {
    super(message);
    Object.defineProperty(this, "name", { value: "Error403" });
  }
}
