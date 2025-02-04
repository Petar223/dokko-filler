import Mammoth from "mammoth";
import { cyrilicToLatin } from "serbian-script-converter";
import { fieldsForFormating } from "./consts";
import { PatchType, TextRun, patchDocument } from "docx";

const getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString("sr-RS", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatField = (key, value, fieldsForFormating) => {
  const fieldName = key.split("_")[0];
  return fieldsForFormating.includes(fieldName)
    ? formatOnlyFirstUpper(value)
    : value;
};

const formatOnlyFirstUpper = (string = "") =>
  string
    .split(" ")
    .map((word) =>
      word.startsWith(`'`)
        ? `'${word[1]?.toUpperCase()}${word?.slice(2)?.toLowerCase()}`
        : `${word[0]?.toUpperCase()}${word?.slice(1)?.toLowerCase()}`,
    )
    .join(" ");

export const convertDocToHtml = async (arrayBuffer) => {
  try {
    const result = await Mammoth.convertToHtml({ arrayBuffer });
    return result.value;
  } catch {
    throw new Error("Failed to convert document to HTML");
  }
};

export const fillWordDocument = async (wordBin, readFields) => {
  const patches = Object.keys(readFields).reduce((acc, key) => {
    const val = formatField(key, readFields[key], fieldsForFormating);
    acc[key] = {
      type: PatchType.PARAGRAPH,
      children: [new TextRun({ text: val, underline: { type: "single" } })],
    };
    return acc;
  }, {});

  return await patchDocument(wordBin, { patches });
};

export const getDate = () => {
  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth() + 1;
  const year = objectDate.getFullYear();

  return `${day}.${month}.${year}`;
};

export const addCustomFields = (fields) => {
  const updatedFields = Object.entries(fields).reduce((acc, [key, value]) => {
    acc[key] = typeof value === "string" ? cyrilicToLatin(value) : value;
    return acc;
  }, {});

  updatedFields["name_1"] =
    `${updatedFields["GivenName_1"]} ${updatedFields["Surname_1"]}`;
  updatedFields["name_2"] =
    `${updatedFields["GivenName_2"]} ${updatedFields["Surname_2"]}`;
  updatedFields["date"] = getCurrentDate();

  return updatedFields;
};

export const extractPlaceholders = (documentContent, fields) => {
  const regex = /{{(\w+)_p([1-7])_(\d+)}}/g;
  const matches = [...documentContent.matchAll(regex)];

  const body = matches.map((match) => ({
    noun: fields[`${match[1]}_${match[3]}`],
    case: `p${match[2]}`,
    apikey: "blokbrateblokbruklinbato",
    originalPlaceholder: `${match[1]}_p${match[2]}_${match[3]}`,
  }));

  return body;
};
