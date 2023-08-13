export default class Component {
  $target;
  props;
  state;
  constructor($target, props) {
    this.$target = $target;
    this.props = props; // props 할당
    this.setup();
    this.setEvent(); // constructor에서 한 번만 실행한다.
    this.render();
  }
  setup() {}
  mounted() {}
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted(); // render 이후에 추가적인 기능 수행을 위해 추가한다.
  }
  setEvent() {
    this.addEvent("click", ".addBtn", ({ target }) => {
      const { items } = this.state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });

    this.addEvent("click", ".deleteBtn", ({ target }) => {
      const items = [...this.state.items];
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
