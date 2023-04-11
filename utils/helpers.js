module.exports = {
  format_date: (date) => {

    // Check if date is valid before formatting
    if (!date) {
      return "";
    }

    // Format date as MM/DD/YYYY
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  },

  equal: (a, b) => a == b,
};