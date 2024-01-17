import { SerializedError } from "@reduxjs/toolkit";

export interface IOrderState {
  values?: null | [];
  value?: {};
  loading?: boolean;
  error?: SerializedError | boolean;
  success?: boolean;
}
