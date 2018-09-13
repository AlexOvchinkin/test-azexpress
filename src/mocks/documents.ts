import IDocument from "../interfaces/IDocument";
import Status from "../enums/Status";

const documents: IDocument[] = [
  {
    id       : 1,
    from     : 'Москва',
    to       : 'Хабаровск',
    customer : 'Иванов И.И.',
    status   : Status[0]
  },
  {
    id       : 2,
    from     : 'Тверь',
    to       : 'Владивосток',
    customer : 'Петров И.И.',
    status   : Status[1]
  },
  {
    id       : 3,
    from     : 'Москва',
    to       : 'Красноярск',
    customer : 'Сидоров И.И.',
    status   : Status[2]
  },
  {
    id       : 4,
    from     : 'Омск',
    to       : 'Иркутск',
    customer : 'Иванов И.И.',
    status   : Status[3]
  },
  {
    id       : 5,
    from     : 'Москва',
    to       : 'Самара',
    customer : 'Петров И.И.',
    status   : Status[4]
  },
  {
    id       : 6,
    from     : 'Томск',
    to       : 'Челябинск',
    customer : 'Сидоров И.И.',
    status   : Status[5]
  }
];

export default documents;