const PROTECTED_CATEGORIES = ["ENT", "MM", "SMB", "Startup"];

export const shouldShowDeleteIcon = (option, allowAddNew, onDelete) => {
  return (
    allowAddNew && !PROTECTED_CATEGORIES.includes(option.label) && onDelete
  );
};

export const getMenuPosition = (triggerRef, dropdownOptionsLength) => {
  if (!triggerRef.current) return { top: 0, left: 0, width: 0 };

  const triggerRect = triggerRef.current.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  let top = triggerRect.bottom + scrollTop;
  let left = triggerRect.left + scrollLeft;
  const width = triggerRect.width;

  if (left + width > window.innerWidth) {
    left = triggerRect.right + scrollLeft - width;
  }

  const menuHeight = 40 * dropdownOptionsLength;
  if (top + menuHeight > window.innerHeight + scrollTop) {
    top = triggerRect.top + scrollTop - menuHeight;
  }

  return { top, left, width };
};
