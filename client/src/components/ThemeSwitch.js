// import React, { Component } from "react";

// class ThemeSwitch extends Component {
//   //Add constructor
//   constructor(props) {
//     super(props);

//     this.state = {
//       active: "false"
//     };
//     this.store = typeof localStorage === "undefined" ? null : localStorage;

//     this.css = `
//     html { filter: invert(100%); background: #fefefe; }
//     * { background-color: inherit }
//     img:not([src*=".jpg"]), video { filter: invert(100%) }`;
//   }

//   isActive = () => this.state.active;
//   //Toggle for the state
//   toggle = () => {
//     this.setState({
//       active: !this.isActive()
//     });
//   };

//   // Fetch and apply the saved settings after the component mounts to the page
//   componentDidUpdate() {
//     if (this.store) {
//       this.store.setItem("ThemeSwitch", this.state.active);
//     }
//   }

//   render() {
//     // JSX Markup
//     return (
//       <div>
//         <button aria-pressed={this.isActive()} onClick={this.toggle}>
//           dark theme:
//           <span aria-hidden="true">{this.isActive() ? "on" : "off"}</span>
//         </button>
//         <style media={this.isActive() ? this.css.trim() : this.css} />
//       </div>
//     );
//   }
// }

// export default ThemeSwitch;
