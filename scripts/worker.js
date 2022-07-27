self.onmessage = (event) => {
  const input = event.data;
  self.postMessage(true);
};
