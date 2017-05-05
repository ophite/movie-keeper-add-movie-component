'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutocompleteComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAutocomplete = require('react-autocomplete');

var _reactAutocomplete2 = _interopRequireDefault(_reactAutocomplete);

var _movieApi = require('../../api/movieApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  inputStyle: {
    width: '100%'
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

var AutocompleteComponent = function (_Component) {
  _inherits(AutocompleteComponent, _Component);

  function AutocompleteComponent(props) {
    _classCallCheck(this, AutocompleteComponent);

    var _this = _possibleConstructorReturn(this, (AutocompleteComponent.__proto__ || Object.getPrototypeOf(AutocompleteComponent)).call(this, props));

    _this.state = {
      value: '',
      items: []
    };

    _this.onSelect = _this.onSelect.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.renderItem = _this.renderItem.bind(_this);
    return _this;
  }

  _createClass(AutocompleteComponent, [{
    key: 'onSelect',
    value: function onSelect(value, item) {
      var _this2 = this;

      this.setState({ value: value, items: [item] });

      (0, _movieApi.getMovie)(value).then(function (response) {
        if (!response) {
          return;
        }

        var calcRating = function calcRating(rawRating) {
          return parseInt(+rawRating * 5 / 10, 10);
        };
        var movieRaw = JSON.parse(response);
        var movie = {
          title: movieRaw.Title,
          director: movieRaw.Director,
          year: movieRaw.Year,
          rating: calcRating(movieRaw.imdbRating)
        };

        _this2.props.setMovie(movie);
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(event, value) {
      var _this3 = this;

      this.setState({ value: value });
      if (!value || value.length < 3) {
        return;
      }

      (0, _movieApi.getMovies)(value).then(function (response) {
        if (!response) {
          _this3.setState({
            items: []
          });
          return;
        }

        try {
          var moviesListRaw = JSON.parse(response);
          if (!moviesListRaw.Search) {
            _this3.setState({
              items: []
            });
            return;
          }

          var items = moviesListRaw.Search.map(function (movie, index) {
            return {
              name: movie.Title,
              id: index
            };
          });

          _this3.setState({
            items: items
          });
        } catch (error) {
          throw error;
        }
      });
    }
  }, {
    key: 'renderItem',
    value: function renderItem(item, isHighlighted) {
      return _react2.default.createElement(
        'div',
        { key: item.id,
          style: isHighlighted ? styles.highlightedItem : styles.item },
        item.name
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactAutocomplete2.default, { ref: 'autocomplete',
        value: this.state.value,
        items: this.state.items,
        getItemValue: function getItemValue(item) {
          return item.name;
        },
        wrapperStyle: styles.inputStyle,
        inputProps: { style: styles.inputStyle },
        menuStyle: styles.menuStyle,
        onSelect: this.onSelect,
        onChange: this.onChange,
        renderItem: this.renderItem });
    }
  }]);

  return AutocompleteComponent;
}(_react.Component);

AutocompleteComponent.propTypes = {
  setMovie: _react2.default.PropTypes.func
};

exports.AutocompleteComponent = AutocompleteComponent;