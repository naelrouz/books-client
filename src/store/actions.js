export default {
  async firstLoad({
    dispatch
  }) {
    await dispatch('books');
  }
};
