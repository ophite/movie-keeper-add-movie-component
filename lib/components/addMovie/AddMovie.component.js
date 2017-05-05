'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddMovieComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _flexboxReact = require('flexbox-react');

var _flexboxReact2 = _interopRequireDefault(_flexboxReact);

var _form = require('muicss/lib/react/form');

var _form2 = _interopRequireDefault(_form);

var _input = require('muicss/lib/react/input');

var _input2 = _interopRequireDefault(_input);

var _button = require('muicss/lib/react/button');

var _button2 = _interopRequireDefault(_button);

var _reactRating = require('react-rating');

var _reactRating2 = _interopRequireDefault(_reactRating);

var _Autocomplete = require('../autocomplete/Autocomplete.component');

require('./AddMovie.component.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddMovieComponent = function (_Component) {
  _inherits(AddMovieComponent, _Component);

  function AddMovieComponent(props) {
    _classCallCheck(this, AddMovieComponent);

    var _this = _possibleConstructorReturn(this, (AddMovieComponent.__proto__ || Object.getPrototypeOf(AddMovieComponent)).call(this, props));

    _this.setMovie = function (movie) {
      _this.setState({
        movie: movie
      });
    };

    _this.renderControls = function () {};

    _this.renderFooter = function () {
      return _react2.default.createElement(
        'div',
        { style: { textAlign: 'right' } },
        _react2.default.createElement(
          _button2.default,
          { variant: 'flat', onClick: _this.handleCancel },
          'Cancel'
        ),
        _react2.default.createElement(
          _button2.default,
          { variant: 'flat', color: 'primary' },
          'Submit'
        )
      );
    };

    _this.state = {
      movie: {}
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    return _this;
  }

  _createClass(AddMovieComponent, [{
    key: 'handleAddAttr',
    value: function handleAddAttr(type, obj) {
      var update = {};
      update[type] = obj.currentTarget.value;
      this.setState({
        movie: Object.assign({}, this.state.movie, update)
      });
    }
  }, {
    key: 'handleSetRating',
    value: function handleSetRating(rating) {
      this.handleAddAttr('rating', {
        currentTarget: {
          value: rating
        }
      });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(e) {
      e.preventDefault();
      this.props.handleClose(this.state.movie);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      this.props.handleAddNewMovie(this.state.movie);
    }
  }, {
    key: 'renderAutocomplete',
    value: function renderAutocomplete() {
      return _react2.default.createElement(
        'div',
        { className: 'autocomplete' },
        'Search movie',
        _react2.default.createElement(_Autocomplete.AutocompleteComponent, { setMovie: this.setMovie })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _flexboxReact2.default,
        { className: 'overlay', style: { display: 'flex' } },
        _react2.default.createElement(
          _flexboxReact2.default,
          { className: 'add-movie-container' },
          _react2.default.createElement(
            _form2.default,
            { className: 'add-movie-form',
              onSubmit: this.handleSubmit },
            _react2.default.createElement(
              'legend',
              null,
              'Add Movie'
            ),
            this.renderAutocomplete(),
            _react2.default.createElement(_input2.default, { ref: 'title',
              label: 'Title',
              floatingLabel: true,
              value: this.state.movie.title,
              onChange: this.handleAddAttr.bind(this, 'title') }),
            _react2.default.createElement(_input2.default, { ref: 'director',
              label: 'Director',
              floatingLabel: true,
              value: this.state.movie.director,
              onChange: this.handleAddAttr.bind(this, 'director') }),
            _react2.default.createElement(_input2.default, { ref: 'year',
              label: 'Year of Release',
              floatingLabel: true,
              value: this.state.movie.year,
              onChange: this.handleAddAttr.bind(this, 'year') }),
            _react2.default.createElement(
              'div',
              { className: 'mui-textfield', style: { marginBottom: 0 } },
              _react2.default.createElement(
                'div',
                { style: { marginBottom: 15 } },
                'Rating'
              ),
              _react2.default.createElement(_reactRating2.default, { initialRate: this.state.movie.rating || 0,
                onClick: this.handleSetRating.bind(this) })
            ),
            this.renderFooter()
          )
        )
      );
    }
  }]);

  return AddMovieComponent;
}(_react.Component);

AddMovieComponent.propTypes = {
  handleClose: _react2.default.PropTypes.func,
  handleAddNewMovie: _react2.default.PropTypes.func
};

exports.AddMovieComponent = AddMovieComponent;