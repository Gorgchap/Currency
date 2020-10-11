export enum CurrencyCharCode {EUR = 'EUR', USD = 'USD', RUB = 'RUB'}

export enum ResponseView {XML = 'XML', JSON = 'JSON'}

export interface CurrencyType {
  CharCode: CurrencyCharCode;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: string;
  Previous?: number;
  Value: number;
}

export interface Source {
  id: number;
  url: string;
  view: ResponseView;
}

export const initialSources: Source[] = [
  {
    id: 1,
    url: 'https://www.cbr-xml-daily.ru/daily_utf8.xml',
    view: ResponseView.XML
  },
  {
    id: 2,
    url: 'https://www.cbr-xml-daily.ru/daily_jsonp.js',
    view: ResponseView.JSON,
  }
];

export const extraSources: Source[] = [
  {
    id: 3,
    url: 'https://www.cbr-xml-daily.ru/daily.xml',
    view: ResponseView.XML
  },
  {
    id: 4,
    url: 'https://www.cbr-xml-daily.ru/daily_eng.xml',
    view: ResponseView.XML
  },
  {
    id: 5,
    url: 'https://www.cbr-xml-daily.ru/daily_eng_utf8.xml',
    view: ResponseView.XML
  },
  {
    id: 6,
    url: 'https://www.cbr-xml-daily.ru/daily_json.js',
    view: ResponseView.JSON
  }
];
