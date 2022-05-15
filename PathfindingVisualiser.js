"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Node = _interopRequireDefault(require("./Node/Node"));

var _dijkstra = require("./algorithms/dijkstra");

require("./PathfindingVisualiser.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 35;

var PathfindingVisualizer = /*#__PURE__*/function (_Component) {
  _inherits(PathfindingVisualizer, _Component);

  var _super = _createSuper(PathfindingVisualizer);

  function PathfindingVisualizer() {
    var _this;

    _classCallCheck(this, PathfindingVisualizer);

    _this = _super.call(this);
    _this.state = {
      grid: [],
      mouseIsPressed: false
    };
    return _this;
  }

  _createClass(PathfindingVisualizer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var grid = getInitialGrid();
      this.setState({
        grid: grid
      });
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(row, col) {
      var newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({
        grid: newGrid,
        mouseIsPressed: true
      });
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter(row, col) {
      if (!this.state.mouseIsPressed) return;
      var newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({
        grid: newGrid
      });
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp() {
      this.setState({
        mouseIsPressed: false
      });
    }
  }, {
    key: "animateDijkstra",
    value: function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
      var _this2 = this;

      var _loop = function _loop(i) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(function () {
            _this2.animateShortestPath(nodesInShortestPathOrder);
          }, 10 * i);
          return {
            v: void 0
          };
        }

        setTimeout(function () {
          var node = visitedNodesInOrder[i];
          document.getElementById("node-".concat(node.row, "-").concat(node.col)).className = 'node node-visited';
        }, 10 * i);
      };

      for (var i = 0; i <= visitedNodesInOrder.length; i++) {
        var _ret = _loop(i);

        if (_typeof(_ret) === "object") return _ret.v;
      }
    }
  }, {
    key: "animateShortestPath",
    value: function animateShortestPath(nodesInShortestPathOrder) {
      var _loop2 = function _loop2(i) {
        setTimeout(function () {
          var node = nodesInShortestPathOrder[i];
          document.getElementById("node-".concat(node.row, "-").concat(node.col)).className = 'node node-shortest-path';
        }, 50 * i);
      };

      for (var i = 0; i < nodesInShortestPathOrder.length; i++) {
        _loop2(i);
      }
    }
  }, {
    key: "visualizeDijkstra",
    value: function visualizeDijkstra() {
      var grid = this.state.grid;
      var startNode = grid[START_NODE_ROW][START_NODE_COL];
      var finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      var visitedNodesInOrder = (0, _dijkstra.dijkstra)(grid, startNode, finishNode);
      var nodesInShortestPathOrder = (0, _dijkstra.getNodesInShortestPathOrder)(finishNode);
      this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          grid = _this$state.grid,
          mouseIsPressed = _this$state.mouseIsPressed;
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
        onClick: function onClick() {
          return _this3.visualizeDijkstra();
        }
      }, "Visualize Dijkstra's Algorithm"), /*#__PURE__*/_react.default.createElement("div", {
        className: "grid"
      }, grid.map(function (row, rowIdx) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: rowIdx
        }, row.map(function (node, nodeIdx) {
          var row = node.row,
              col = node.col,
              isFinish = node.isFinish,
              isStart = node.isStart,
              isWall = node.isWall;
          return /*#__PURE__*/_react.default.createElement(_Node.default, {
            key: nodeIdx,
            col: col,
            isFinish: isFinish,
            isStart: isStart,
            isWall: isWall,
            mouseIsPressed: mouseIsPressed,
            onMouseDown: function onMouseDown(row, col) {
              return _this3.handleMouseDown(row, col);
            },
            onMouseEnter: function onMouseEnter(row, col) {
              return _this3.handleMouseEnter(row, col);
            },
            onMouseUp: function onMouseUp() {
              return _this3.handleMouseUp();
            },
            row: row
          });
        }));
      })));
    }
  }]);

  return PathfindingVisualizer;
}(_react.Component);

exports.default = PathfindingVisualizer;

var getInitialGrid = function getInitialGrid() {
  var grid = [];

  for (var row = 0; row < 20; row++) {
    var currentRow = [];

    for (var col = 0; col < 40; col++) {
      currentRow.push(createNode(col, row));
    }

    grid.push(currentRow);
  }

  return grid;
};

var createNode = function createNode(col, row) {
  return {
    col: col,
    row: row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

var getNewGridWithWallToggled = function getNewGridWithWallToggled(grid, row, col) {
  var newGrid = grid.slice();
  var node = newGrid[row][col];
  var newNode = { ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

var domContainer = document.querySelector('#pathfinding_visualiser_container');
ReactDOM.render( /*#__PURE__*/_react.default.createElement(PathfindingVisualizer, null), domContainer);