import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    searchText: '',
  };

  handleChange = evt => {
    this.setState({ searchText: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.handleSubmit(this.state.searchText);
  }

  render() {
    return (
      <SearchFormStyled  onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.handleChange}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={this.state.searchText}
        />
      </SearchFormStyled>
    );
  }
}
