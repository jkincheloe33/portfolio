export const setPayload = (refs, setRefs) => {
  refs.forEach(ref => {
    const payload = { payload: ref, type: 'create' };
    setRefs(payload);
  });
};
