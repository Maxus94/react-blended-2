import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, Text, SearchForm, ImageGallery, Loader } from 'components';
import {ImageModal} from "../components/ImageModal/ImageModal";

export class Gallery extends Component {
  state = {
    searchText: '',
    page: 1,
    photos: [],
    showBtn: false,
    isEmpty: false,
    isLoading: false,
  };


  componentDidUpdate(_, prevState) {
    const { searchText, page } = this.state;
    if (searchText !== prevState.searchText || page !== prevState.page) {
      this.setState({ isLoading: true });
      ImageService.getPhotos(searchText, page)
        .then(({ photos, total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos],
            showBtn: page < Math.ceil(total_results / 15),
          }));
        })
        .catch()
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = searchText => {
    this.setState({
      searchText,
      page: 1,
      photos: [],
      showBtn: false,
      isEmpty: false,
      isShowModal: false,
      modalImg: '',
      textAlt: '',
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleOpenModel = ({ modalImg, textAlt }) => {
    this.setState({ isShowModal: true, modalImg, textAlt });

  };

  handleCloseModal = () => {
    this.setState({ isShowModal: false, modalImg: '', textAlt: '' });
  }

  render() {
    const {
      photos,
      showBtn,
      isEmpty,
      isLoading ,
      isShowModal,
      modalImg,
      textAlt
    } = this.state;
    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />
        {photos.length > 0 && <ImageGallery
          photos={photos}
          onOpenModal={this.handleOpenModel}
        />}
        {showBtn && (
          <Button onClick={this.handleLoadMore}>Load more ...</Button>
        )}
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {isLoading && <Loader />}

        {isShowModal && <ImageModal img={modalImg} textAlt={textAlt} onClose={this.handleCloseModal}/>}
      </>
    );
  }
}
