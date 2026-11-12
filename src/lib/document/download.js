export const downloadBlob = (blob, fileName) => {
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName;
  // Firefox needs the link in the DOM; Safari needs the URL alive a bit longer.
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
};

export class TemplateFetchError extends Error {}

export const fetchTemplate = async (url) => {
  const response = await fetch(url);
  // An expired S3 URL answers 403 with an XML body; don't parse that as docx.
  if (!response.ok) {
    throw new TemplateFetchError(`Template fetch failed: ${response.status}`);
  }
  return response.arrayBuffer();
};
