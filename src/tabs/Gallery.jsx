import { Component } from 'react';

import * as ImageService from 'service/image-service';
import {
  Button,
  Grid,
  GridItem,
  Text,
  CardItem,
  SearchForm,
  ImageGallery,
} from 'components';

export class Gallery extends Component {
  state = {
    searchText: '',
    page: 1,
    photos: [],
    showBtn: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchText, page } = this.state;
    if (searchText !== prevState.searchText || page !== prevState.page) {
      ImageService.getPhotos(searchText, page).then(
        ({ photos, total_results }) => {
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos],
            showBtn: page < Math.ceil(total_results / 15),
          }));
        }
      );
    }
  }

  handleSubmit = searchText => {
    this.setState({ searchText });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { photos, showBtn } = this.state;
    return (
      <>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        <SearchForm handleSubmit={this.handleSubmit} />
        {photos.length > 0 && <ImageGallery props={photos} />}
        {showBtn && (
          <Button onClick={this.handleLoadMore}>Load more ...</Button>
        )}
      </>
    );
  }
}
