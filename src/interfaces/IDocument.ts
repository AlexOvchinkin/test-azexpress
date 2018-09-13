import Status from "../enums/Status";

export default interface IDocument {
  id        ?: number,
  from      : string,
  to        : string,
  customer  : string,
  status    : string
}