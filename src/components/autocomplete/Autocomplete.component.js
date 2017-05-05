import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import { getMovie, getMovies } from '../../api/movieApi';

const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  inputStyle: {
    width: '100%',
  },

  menuStyle: {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 11)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '50%'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
};


class AutocompleteComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      items: []
    };

    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  onSelect(value, item) {
    this.setState({ value, items: [item] });

    getMovie(value).then(response => {
      if (!response) {
        return;
      }

      const calcRating = (rawRating) => {
        return parseInt(+rawRating * 5 / 10, 10);
      };
      const movieRaw = JSON.parse(response);
      const movie = {
        title: movieRaw.Title,
        director: movieRaw.Director,
        year: movieRaw.Year,
        rating: calcRating(movieRaw.imdbRating),
      };

      this.props.setMovie(movie);
    })
  };

  onChange(event, value) {
    this.setState({ value });
    if (!value || value.length < 3) {
      return;
    }

    getMovies(value).then(response => {
      if (!response) {
        this.setState({
          items: [],
        });
        return;
      }

      try {
        const moviesListRaw = JSON.parse(response);
        if (!moviesListRaw.Search) {
          this.setState({
            items: [],
          });
          return;
        }

        const items = moviesListRaw.Search.map((movie, index)=> {
          return {
            name: movie.Title,
            id: index
          };
        });

        this.setState({
          items,
        });
      }
      catch (error) {
        throw error;
      }
    });
  };

  renderItem(item, isHighlighted) {
    return (
      <div key={item.id}
           style={isHighlighted ? styles.highlightedItem : styles.item}>
        {item.name}
      </div>
    );
  };

  render() {
    return (
      <Autocomplete ref="autocomplete"
                    value={this.state.value}
                    items={this.state.items}
                    getItemValue={(item) => item.name}
                    wrapperStyle={styles.inputStyle}
                    inputProps={{style:styles.inputStyle}}
                    menuStyle={styles.menuStyle}
                    onSelect={this.onSelect}
                    onChange={this.onChange}
                    renderItem={this.renderItem}/>
    );
  }
}

AutocompleteComponent.propTypes = {
  setMovie: React.PropTypes.func
};

export {
  AutocompleteComponent
};
