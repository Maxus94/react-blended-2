import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, Grid, GridItem, Text, CardItem, SearchForm } from 'components';

export class Gallery extends Component {
  state = {
    searchText: '',
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    const { searchText, page } = this.state;
    if (searchText !== prevState.searchText || page !== prevState.page) {
      ImageService.getPhotos(searchText, page);
    }
  }

  handleSubmit = searchText => {
    this.setState({ searchText });
  };

  render() {
    return (
      <>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        <SearchForm handleSubmit={this.handleSubmit} />
      </>
    );
  }
}
