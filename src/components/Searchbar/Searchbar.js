// import {Component} from 'react'
// import PropTypes from 'prop-types'
// import s from './Searchbar.module.css'

// export default class Searchbar extends Component {
//   state = {
//     text: '',
//   };
//   onChange = event => {
//     const { value } = event.target;
//     this.setState({ text: value });
//   };
//   handleSubmit = event => {
//     event.preventDefault()
//     const { onSubmit } = this.props;
//     onSubmit(this.state.text)
//   };
//   render() {
//     const { text } = this.state;
//     return (
//       <header className={s.Searchbar}>
//         <form onSubmit={this.handleSubmit} className={s.SearchForm}>
//           <button type="submit" className={s.SearchForm__button}>
//             <span className={s.SearchForm__button__label}>Search</span>
//           </button>

//           <input
//             className={s.SearchForm__input} onChange={this.onChange}
//             type="text"
//             value={text}
//             autocomplete="off"
//             autofocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   };
// }

import { useState } from "react";
import s from "./Searchbar.module.css";

export default function Searchbar({onSubmit}) {
  const [text, setText] = useState("");

  const onChange = event => {
    setText(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    (event.preventDefault());
    onSubmit(text);
    setText('')
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form onSubmit={handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={s.SearchForm__input}
            onChange={onChange}
            type="text"
            value={text}
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}

