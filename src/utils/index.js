export function sortAddress(add) {
  const sortAdd = `${add?.slice(0, 6)}...${add?.slice(add?.length - 4)}`;
  return sortAdd;
}

export function sortAccount(add) {
  const sortAdd = `${add?.slice(0, 0)}...${add?.slice(add?.length - 4)}`;
  return sortAdd;
}

export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};

export const menuProps = {
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  elevation: 0,
  PaperProps: {
    style: {
      maxHeight:200,
      border: "1px solid #ECECEC",
      borderRadius: "8px",
    },
  },
};
