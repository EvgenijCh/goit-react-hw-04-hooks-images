// import { Component } from 'react'
// import Searchbar from './components/Searchbar/Searchbar'
// import Button from './components/Button/Button'
// import ImageGallery from './components/ImageGallery'
// import Modal from './components/Modal/Modal'
// import * as API from'./services/Api.js'
// import Loader from './components/Loader/Loader'
// import './App.css';

// export default class App extends Component {
//   state = {
//     query: "",
//     images: [],
//     page: 1,
//     isModalOpen: false,
//     isLoading: false,
//   };

//   componentDidMount() {
//     const { query, page, isLoading } = this.state;
//     if (query.length >= 1)
//     this.onSubmit(query, page, isLoading);
//   }
//   componentDidUpdate(prevProps, prevState) {
//     const { page } = this.state;
//     if (prevState.page !== page) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth'
//       });
//     }
//   }
//   openModal = modalImage => {
//     this.setState({ isModalOpen: true, modalImage });
//     window.addEventListener('keydown', this.closeModal);
//   };
//   closeModal = event => {
//     if (event.target === event.currentTarget || event.keyCode === 27)
//       this.setState({ isModalOpen: false });
//     window.removeEventListener('keydown', this.closeModal);
//   };

//   onSubmit = query => {
//     this.setState({ query, isLoading: true })
//     API.getImages(query).then(resData => {
//       this.setState({ images: resData.data.hits })
//     })
//       .finally(() => this.setState({ isLoading: false }))
//   };
    
//   changePage = () => {
//     const { query, page } = this.state;
//     API.getImages(query, page + 1).then(resData => {
//       this.setState((prevState) => ({
//         page: prevState + 1,
//         images: [...prevState.images, ...resData.data.hits],
//       }));
//     });
//   };
//    render () {
//   const { images, isModalOpen, modalImage, isLoading } = this.state;
//     return (
//       <> 
//       <Searchbar onSubmit={this.onSubmit} />
//       {isLoading && <Loader/>}
//       <ImageGallery images={images} openModal={this.openModal} />
//       {images.length > 0 && <Button changePage={this.changePage } />}
//       {isModalOpen && (<Modal modalImage = {modalImage} closeModal = {this.closeModal}/>)}
//       </>
//       );
//    }
//   }

import { useState, useEffect} from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import Button from "./components/Button/Button";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal/Modal";
import * as API from "./services/Api.js";
import Loader from "./components/Loader/Loader";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
   
  useEffect(() => {
    
    });
         
    

    const openModal = modalImage => {
      setIsModalOpen({ isModalOpen: true, modalImage });
      window.addEventListener("keydown", closeModal);
    };
    const closeModal = event => {
      if (event.target === event.currentTarget || event.keyCode === 27)
        setIsModalOpen({ isModalOpen: false });
      window.removeEventListener("keydown", closeModal);
    };

    const onSubmit = (query) => {
      setQuery({ query, isLoading: true });
      API.getImages(query)
        .then((resData) => {
          setImages({ images: resData.data.hits });
        })
        .finally(() => setIsLoading({ isLoading: false }));
    };

    const changePage = () => {
      API.getImages(query, page + 1).then((resData) => {
        setPage((prevState) => ({
          page: prevState + 1,
          images: [...prevState.images, ...resData.data.hits],
        }));
      });
    };
    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} openModal={openModal} />
        {images.length > 0 && <Button changePage={changePage} />}
        {isModalOpen && (
          <Modal modalImage={openModal} closeModal={closeModal} />
        )}
      </>
    );
  }



