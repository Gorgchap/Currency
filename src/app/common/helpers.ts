import {xml2json} from 'xml-js';

export function getArray(obj) {
  const result = [];
  Object.keys(obj['Valute']).forEach(key => result.push(obj['Valute'][key]));
  return result;
}

export function xmlToJson(xmlStr) {
  const convertedData = JSON.parse(xml2json(xmlStr, {compact: true}))['ValCurs']['Valute'];
  return convertedData.map(item => ({
    ...item._attributes,
    CharCode: item.CharCode._text,
    Name: item.Name._text,
    Nominal: +item.Nominal._text,
    NumCode: item.NumCode._text,
    Value: +item.Value._text.replace(',', '.')
  }));
}
