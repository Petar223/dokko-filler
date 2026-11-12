export async function downloadFile(filledBlob, fileName) {
  const aElement = document.createElement('a');
  aElement.setAttribute('download', fileName);
  const href = URL.createObjectURL(filledBlob);
  aElement.href = href;
  aElement.setAttribute('target', '_blank');
  aElement.click();
  URL.revokeObjectURL(href);
}

export async function getDocForm(url) {
  const docFromS3 = await fetch(url);
  const docBlob = await docFromS3.blob();
  const docS3Bytes = await docBlob.arrayBuffer();

  return docS3Bytes;
}
