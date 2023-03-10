export const colorRatingBorder = (rating) => {
  if (rating <= 3.99) {
    return 'red';
  } else if (rating >= 4 && rating < 6.99) {
    return 'orange';
  } else if (rating >= 7) {
    return 'green';
  } else {
    return 'grey';
  }
};

export const correctRatingPercent = (rating) => {
  return rating !== null ? rating.replace('.0%', '%') : 'N/R';
};

export const removeElements = (a,b) => {
  a.remove();
  b.remove();
}

