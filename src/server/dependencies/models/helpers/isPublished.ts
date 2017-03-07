export function isPublished() {
  if (this && this.isCustom) {
    return false;
  }

  if (this && this.parent) {
    return this.parent().status === 'Published';
  }

  return this.status === 'Published';
}