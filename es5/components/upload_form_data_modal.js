'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('react-dom'),
    findDOMNode = _require2.findDOMNode;

var PropTypes = React.PropTypes;

var _require3 = require('material-ui/Card'),
    Card = _require3.Card,
    CardText = _require3.CardText,
    CardHeader = _require3.CardHeader;

var IconButton = require('material-ui/IconButton').default;
var CloseIcon = require('material-ui/svg-icons/navigation/close').default;
var CircularProgress = require('material-ui/CircularProgress').default;
var CheckCircleIcon = require('material-ui/svg-icons/action/check-circle').default;
var RaisedButton = require('material-ui/RaisedButton').default;
var Snackbar = require('material-ui/Snackbar').default;
var WarningIcon = require('material-ui/svg-icons/alert/warning').default;

var _require4 = require('material-ui/List'),
    List = _require4.List,
    ListItem = _require4.ListItem;

var Subheader = require('material-ui/Subheader').default;
var colors = require('material-ui/styles/colors');

var _require5 = require('react-intl'),
    defineMessages = _require5.defineMessages,
    FormattedMessage = _require5.FormattedMessage;

var dragDrop = require('drag-drop');
var Uploader = require('xform-uploader');

require('insert-css')('.drag div.upload{background-color:#CFD8DC !important;}');

var noop = function noop() {
  return null;
};

var styles = {
  card: {
    maxHeight: '100%',
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  cardContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex'
  },
  cardText: {
    overflow: 'auto'
  },
  header: {
    lineHeight: '22px',
    boxSizing: 'content-box',
    borderBottom: '1px solid #cccccc'
  },
  uploadBox: {
    backgroundColor: '#eee',
    border: '2px dashed #aaa',
    color: '#ccc',
    fontWeight: 'bold',
    fontSize: '46px',
    padding: '25px',
    textAlign: 'center'
  }
};

var messages = defineMessages({
  dragHere: {
    id: 'upload.dragHere',
    defaultMessage: 'DRAG HERE',
    description: 'Drag target when uploading forms'
  },
  pendingForms: {
    id: 'upload.pendingForms',
    defaultMessage: 'Forms',
    description: 'Subheader text when listing forms available to upload'
  },
  missingAttachments: {
    id: 'upload.missingAttachments',
    defaultMessage: 'Missing Attachments',
    description: 'Subheader text when listing attachments that are missing from pending forms'
  },
  upload: {
    id: 'upload.upload',
    defaultMessage: 'Upload',
    description: 'Button text when uploading forms'
  },
  uploadFormData: {
    id: 'upload.uploadFormData',
    defaultMessage: 'Add Form Data',
    description: 'Dialog title text when allowing users to upload form data'
  }
});

var UploadFormDataModal = function (_React$Component) {
  (0, _inherits3.default)(UploadFormDataModal, _React$Component);

  function UploadFormDataModal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UploadFormDataModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UploadFormDataModal.__proto__ || (0, _getPrototypeOf2.default)(UploadFormDataModal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      forms: [],
      missingAttachments: [],
      orphanAttachments: [],
      showSnackbar: false,
      snackbarMessage: 'Forms uploaded.',
      uploading: false
    }, _this.uploadForms = function () {
      var _this$props = _this.props,
          mediaUrl = _this$props.mediaUrl,
          observationsUrl = _this$props.observationsUrl;

      // trigger progress spinner

      _this.setState({
        uploading: true
      });

      _this.uploader.upload({
        mediaUrl: mediaUrl,
        observationsUrl: observationsUrl
      }, function (err) {
        _this.setState({
          uploading: false
        });

        // cancel progress spinner
        if (err) {
          return console.warn(err.stack);
        }

        _this.setState({
          showSnackbar: true
        });

        _this.resetUploader();
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(UploadFormDataModal, [{
    key: 'resetUploader',
    value: function resetUploader() {
      var _this2 = this;

      this.uploader = new Uploader();

      this.uploader.on('change', function () {
        _this2.setState(_this2.uploader.state());
      });

      this.setState(this.uploader.state());
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.resetUploader();

      this.removeDragDrop = dragDrop(findDOMNode(this.uploadContainer), function (files) {
        _this3.uploader.add(files, function (err) {
          if (err) {
            console.warn(err.stack);
          }
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeDragDrop();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var onCloseClick = this.props.onCloseClick;
      var _state = this.state,
          forms = _state.forms,
          showSnackbar = _state.showSnackbar,
          snackbarMessage = _state.snackbarMessage,
          uploading = _state.uploading;


      return React.createElement(
        Card,
        {
          style: styles.card,
          containerStyle: styles.cardContainerStyle,
          zDepth: 2 },
        React.createElement(
          CardHeader,
          {
            style: styles.header,
            title: React.createElement(
              'h3',
              { style: styles.title },
              React.createElement(FormattedMessage, messages.uploadFormData)
            ) },
          React.createElement(
            IconButton,
            { style: { float: 'right' }, onTouchTap: onCloseClick },
            React.createElement(CloseIcon, null)
          )
        ),
        React.createElement(
          CardText,
          { ref: function ref(el) {
              return _this4.uploadContainer = el;
            }, style: styles.cardText },
          React.createElement(
            'div',
            { className: 'upload', style: styles.uploadBox },
            React.createElement(FormattedMessage, messages.dragHere)
          ),
          forms.length > 0 && React.createElement(
            'div',
            null,
            React.createElement(
              List,
              null,
              React.createElement(
                Subheader,
                null,
                React.createElement(FormattedMessage, messages.pendingForms)
              ),
              forms.map(function (form, idx) {
                return React.createElement(ListItem, {
                  key: idx,
                  primaryText: React.createElement(
                    'code',
                    null,
                    form.name
                  ),
                  leftIcon: form.missingAttachments.length ? React.createElement(WarningIcon, { color: colors.orange500 }) : React.createElement(CheckCircleIcon, { color: colors.green500 }),
                  nestedItems: form.missingAttachments.map(function (a, jdx) {
                    return React.createElement(ListItem, {
                      key: jdx,
                      primaryText: React.createElement(
                        'span',
                        null,
                        'Missing ',
                        React.createElement(
                          'code',
                          null,
                          a
                        )
                      )
                    });
                  })
                });
              })
            ),
            React.createElement(RaisedButton, {
              icon: uploading ? React.createElement(CircularProgress, { size: 20, thickness: 2.5 }) : null,
              label: React.createElement(FormattedMessage, messages.upload),
              onTouchTap: uploading ? noop : this.uploadForms,
              primary: true })
          )
        ),
        React.createElement(Snackbar, {
          open: showSnackbar,
          message: snackbarMessage,
          autoHideDuration: 4000
        })
      );
    }
  }]);
  return UploadFormDataModal;
}(React.Component);

UploadFormDataModal.propTypes = {
  mediaUrl: PropTypes.string.isRequired,
  observationsUrl: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    mediaUrl: state.xformUploader.mediaUrl,
    observationsUrl: state.xformUploader.observationsUrl
  };
};

module.exports = connect(mapStateToProps)(UploadFormDataModal);