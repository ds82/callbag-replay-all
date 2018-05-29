const rememberAll = (remberItems = 0) => source => {
  let store = [];
  let sinks = [];
  let ask;
  let done = false;

  const sliceNum = remberItems > 0 ? -1 * remberItems : 0;

  source(0, (type, data) => {
    if (type === 0) {
      ask = data;
      return;
    }

    if (type === 1) {
      store.push(data);
      sinks.forEach(sink => sink(1, data));
    }

    if (type === 2) {
      done = true;
      sinks.forEach(sink => sink(2));
      sinks = [];
    }
  });

  return (start, sink) => {
    if (start !== 0) return;
    sinks.push(sink);

    sink(0, (type, data) => {
      if (type === 0) return;

      if (type === 1) {
        ask(1);
        return;
      }

      if (type === 2) {
        sinks = sinks.filter(s => s !== sink);
      }
    });

    store.slice(sliceNum).forEach(entry => sink(1, entry));

    if (done) {
      sink(2);
    }
  };
};

export default rememberAll;
