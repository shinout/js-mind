"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sigmoidPrime = sigmoidPrime;
exports.vectorizedResult = vectorizedResult;
exports.dropoutLayer = dropoutLayer;
exports.norm = norm;
exports.randn = randn;
var linearAlgebra = require("linear-algebra")();
var Matrix = linearAlgebra.Matrix;

/**
 * Derivative of the sigmoid function.
 * @param {Matrix} z
 * @return {Matrix} converted matrix with the same nRow, nCol
 */

function sigmoidPrime(z) {
  return z.sigmoid().mul(z.sigmoid().mulEach(-1).plusEach(1));
};

/**
 * Return a 10-dimensional unit vector with a 1.0 in the j'th position
 * and zeroes elsewhere.  This is used to convert a digit (0...9)
 * into a corresponding desired output from the neural network.
 * @param {number} j interger: zero to nine
 * @return {Matrix} 10x1
 */
function vectorizedResult(j) {
  var e = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) {
    return [0];
  });
  e[j] = [1];
  return new Matrix(e);
};

/**
 * Randomly drop values from a layer.
 * @param {Matrix} layer
 * @param {number} pDropout probability to drop out value for each element
 * @return {Matrix} converted matrix with the same nRow, nCol
 */
function dropoutLayer(layer, pDropout) {
  return layer.eleMap(function (elem) {
    return Math.random() < pDropout ? 0 : elem;
  });
};

/**
 * Return a sample from a normal distribution.
 * @param {number} mu mean
 * @param {number} sigma sd (must be greater than 0)
 * @return {number} sample
 */
function norm(mu, sigma) {
  var a = 1 - Math.random();
  var b = 1 - Math.random();
  var c = Math.sqrt(-2 * Math.log(a));
  if (0.5 - Math.random() > 0) {
    return c * Math.sin(Math.PI * 2 * b) * sigma + mu;
  } else {
    return c * Math.cos(Math.PI * 2 * b) * sigma + mu;
  }
}

/**
 * Return a matrix, all of whose element are sampled from the standard normal distribution.
 * see http://d.hatena.ne.jp/iroiro123/20111210/1323515616
 *
 * @param {number} rows the number of rows
 * @param {number} cols the number of cols
 * @return {Matrix} random matrix
 */
function randn(rows, cols) {
  var result = new Array(rows);
  for (var i = 0; i < rows; i++) {
    result[i] = [];
    for (var j = 0; j < cols; j++) {
      result[i][j] = norm(0, 1);
    }
  }
  return new Matrix(result);
}