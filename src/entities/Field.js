export class Field {
  constructor(label, sort = undefined, visible = false, filter = undefined) {
    this.label = label;
    this.sort = sort;
    this.visible = visible;
    this.filter = filter;
  }
}
