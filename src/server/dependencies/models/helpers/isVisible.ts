export function isVisible() {
  if (this && this.parent) {
    return this.parent().isVisible;
  }

  return this && this.isVisible;
};
